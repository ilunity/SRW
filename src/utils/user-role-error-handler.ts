import { USER_ROLE } from '../user/entity/user-roles';
import { ForbiddenException } from '@nestjs/common';

export const userRoleErrorHandler = (userRole: USER_ROLE, allowedRoles: USER_ROLE[]) => {
  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    throw new ForbiddenException('Недостаточно полномочий');
  }
};
