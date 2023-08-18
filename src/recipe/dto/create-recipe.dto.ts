import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsDefined()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsNumber()
  readonly time: number;

  @IsDefined()
  @IsNumber()
  readonly servings_number: number;

  @IsDefined()
  @IsString()
  readonly description: string;

  @IsDefined()
  @IsString()
  readonly img: string;
}
