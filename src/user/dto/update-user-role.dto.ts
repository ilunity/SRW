import { IsDefined, IsEnum, IsNumber } from 'class-validator';
import { USER_ROLE } from '../entity/user-roles';

export class UpdateUserRoleDto {
  @IsDefined()
  @IsNumber()
  readonly id: number;

  @IsEnum(USER_ROLE)
  readonly role: USER_ROLE;
}
