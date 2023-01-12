import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';
import { PUBLIC_ROLES } from '../entity/public-roles';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  readonly username: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsEnum(PUBLIC_ROLES)
  readonly role: PUBLIC_ROLES;
}
