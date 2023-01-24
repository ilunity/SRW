import { IsDefined, IsEmail } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsEmail()
  readonly email: string;
}
