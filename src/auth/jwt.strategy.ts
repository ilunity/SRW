import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { USER_ROLE } from '../user/entity/user-roles';

const JWT_SECRET = process.env.JWT_SECRET;

export interface ITokenPayload {
  username: string;
  id: number;
  role: USER_ROLE;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload) {
    return {
      username: payload.username,
      id: payload.sub,
      role: payload.role,
    };
  }
}
