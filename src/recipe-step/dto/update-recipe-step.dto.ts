import { IsDefined, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeStepDto {
  @IsDefined()
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly content?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  img?: Express.Multer.File;
}
