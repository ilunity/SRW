import { IsDefined, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @IsDefined()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsInt()
  readonly time: number;

  @IsDefined()
  @IsInt()
  readonly servings_number: number;

  @IsDefined()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  img: Express.Multer.File;
}
