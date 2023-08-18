import { IsDefined, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsDefined()
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly username?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  avatar: Express.Multer.File;
}
