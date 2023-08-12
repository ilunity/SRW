import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsDefined()
  @IsString()
  readonly username: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;
}
