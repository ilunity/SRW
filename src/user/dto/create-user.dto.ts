import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';
import { PUBLIC_ROLES } from '../entity/public-roles';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  readonly name: string;

  @IsDefined()
  @IsString()
  readonly surname?: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsString()
  readonly password: string;

  @IsEnum(PUBLIC_ROLES)
  readonly role: PUBLIC_ROLES;
}
