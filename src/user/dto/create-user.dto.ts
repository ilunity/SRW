import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  readonly username: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly avatar?: string;
}
