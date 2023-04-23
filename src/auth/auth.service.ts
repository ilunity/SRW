import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto, ReadProfileDto } from './dto';
import { ITokenPayload } from './jwt.strategy';
import { getMailOptions, transporter } from '../utils';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Пользователя с такой почтой не существует');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    const mailOptions = getMailOptions({ token, email: user.email, username: user.username });

    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      throw new NotFoundException('Не удалось отправить ссылку на почту.');
    }
  }

  async getProfile(payload: ITokenPayload): Promise<ReadProfileDto> {
    const user = await this.userService.findOne(payload.id);

    return {
      ...payload,
      avatar: user.avatar,
    };
  }
}
