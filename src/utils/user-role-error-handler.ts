import { USER_ROLE } from '../user/entity/user-roles';
import { ForbiddenException } from '@nestjs/common';

export const isAllowedRole = (userRole: USER_ROLE, allowedRoles: USER_ROLE[]) => {
  return allowedRoles.includes(userRole);
};

export const userRoleErrorHandler = (userRole: USER_ROLE, allowedRoles: USER_ROLE[]) => {
  if (!isAllowedRole(userRole, allowedRoles)) {
    throw new ForbiddenException('Недостаточно полномочий');
  }
};
