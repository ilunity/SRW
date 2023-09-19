import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { USER_ROLE } from '../../user/entity/user-roles';

const JWT_SECRET = process.env.JWT_SECRET;

export interface ILoginTokenPayload {
  username: string;
  sub: number;
  role: USER_ROLE;
}

export type IUserPayload = Omit<ILoginTokenPayload, 'sub'> & {
  id: number;
};

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: ILoginTokenPayload): Promise<IUserPayload> {
    return {
      username: payload.username,
      id: payload.sub,
      role: payload.role,
    };
  }
}
