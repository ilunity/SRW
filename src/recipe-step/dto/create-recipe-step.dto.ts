import { IsDefined, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeStepDto {
  @IsDefined()
  @IsInt()
  readonly recipe_id: number;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  img: Express.Multer.File;
}
