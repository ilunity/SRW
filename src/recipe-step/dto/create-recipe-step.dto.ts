import { IsDefined, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeStepDto {
  @IsDefined()
  @IsNumberString()
  readonly recipe_id: number;

  @IsDefined()
  @IsString()
  readonly content: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly img: Express.Multer.File;
}
