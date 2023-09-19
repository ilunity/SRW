import { IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateRecipeProductDto } from '../../recipe-product/dto';
import { CreateRecipeStepDto } from '../../recipe-step/dto';
import { OmitType } from '@nestjs/swagger';

class RecipeProductDto extends OmitType(CreateRecipeProductDto, ['recipe_id']) {}

class RecipeStepDto extends OmitType(CreateRecipeStepDto, ['recipe_id']) {}

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

  @ValidateNested()
  readonly ingredients: RecipeProductDto[];

  @ValidateNested()
  readonly steps: RecipeStepDto[];

  @ValidateNested()
  readonly categories: number[];
}
