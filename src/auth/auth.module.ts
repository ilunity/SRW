import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtAuthStrategy } from './jwt-strategies';
import { JwtSignUpStrategy } from './jwt-strategies/jwt-sign-up-strategy';

const JWT_SECRET = process.env.JWT_SECRET;
const SECONDS_IN_WEEK = 604800;

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${SECONDS_IN_WEEK}s` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, JwtSignUpStrategy],
})
export class AuthModule {}
