import { UnauthorizedException } from '@nestjs/common';

export const authErrorHandler = (req) => {
  if (!req.user) {
    throw new UnauthorizedException();
  }
};
