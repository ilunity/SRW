import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto, ReadProfileDto, SignUpDto } from './dto';
import { getMailOptions, mailTemplates, transporter } from '../utils/smtp';
import { ISignUpTokenPayload } from './jwt-strategies/jwt-sign-up-strategy';
import { IUserPayload } from './jwt-strategies';
import { ReadRegisterDto } from './dto/read-register-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async sendSignUpToken(signUpDto: SignUpDto) {
    const user = await this.userService.findByEmail(signUpDto.email);
    if (user) {
      throw new ConflictException('Пользоатель с такой почтой существует.');
    }

    const payload: ISignUpTokenPayload = { username: signUpDto.username, email: signUpDto.email };
    const token = this.jwtService.sign(payload);

    const htmlMessage = mailTemplates.signUpTemplate({ token });
    const mailOptions = getMailOptions({ email: signUpDto.email, htmlMessage });

    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      throw new NotFoundException('Не удалось отправить ссылку на почту.');
    }
  }

  async register(payload: ISignUpTokenPayload): Promise<ReadRegisterDto> {
    const user = await this.userService.create(payload);
    const { id, username, role, avatar } = user;

    const token = this.jwtService.sign({ username, sub: user.id, role });

    return { id, username, role, avatar, token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Пользователя с такой почтой не существует');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    const htmlMessage = mailTemplates.loginTemplate({ token, username: user.username });
    const mailOptions = getMailOptions({ email: user.email, htmlMessage });

    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      throw new NotFoundException('Не удалось отправить ссылку на почту.');
    }
  }

  async getProfile(payload: IUserPayload): Promise<ReadProfileDto> {
    const user = await this.userService.findOne(payload.id);

    return {
      ...payload,
      avatar: user.avatar,
    };
  }
}
