import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ReadProfileDto, SignUpDto } from './dto';
import { JwtAuthGuard, JwtSignUpGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** Send the sign-up token to the user email */
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.sendSignUpToken(signUpDto);
  }

  /** Confirms the user sign up and creates the user record in the database*/
  @ApiBearerAuth()
  @UseGuards(JwtSignUpGuard)
  @Get('register')
  register(@Request() req): Promise<ReadProfileDto> {
    return this.authService.register(req.user);
  }

  /** Login the user */
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /** Returns user profile */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<ReadProfileDto> {
    return this.authService.getProfile(req.user);
  }
}
