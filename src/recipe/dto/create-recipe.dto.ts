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
  readonly serves_count: number;

  @IsDefined()
  @IsInt()
  readonly products_count: number;

  @IsDefined()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
