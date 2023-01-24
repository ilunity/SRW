import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  img: Express.Multer.File;
}
