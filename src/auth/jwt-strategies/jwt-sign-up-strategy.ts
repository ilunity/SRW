import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const JWT_SECRET = process.env.JWT_SECRET;

export interface ISignUpTokenPayload {
  username: string;
  email: string;
}

@Injectable()
export class JwtSignUpStrategy extends PassportStrategy(Strategy, 'signup') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: ISignUpTokenPayload) {
    return {
      username: payload.username,
      email: payload.email,
    };
  }
}
