import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  readonly username: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly avatar: Express.Multer.File;
}
