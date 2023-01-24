import { IsDefined, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @IsDefined()
  @IsNumberString()
  readonly user_id: number;

  @IsDefined()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsNumberString()
  readonly time: number;

  @IsDefined()
  @IsNumberString()
  readonly servings_number: number;

  @IsDefined()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  img: Express.Multer.File;
}
