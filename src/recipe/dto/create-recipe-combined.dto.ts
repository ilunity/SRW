import { ValidateNested } from 'class-validator';
import { CreateRecipeProductDto } from '../../recipe-product/dto';
import { CreateRecipeStepDto } from '../../recipe-step/dto';
import { CreateRecipeDto } from './create-recipe.dto';
import { OmitType } from '@nestjs/swagger';
import { CreateRecipeFilterDto } from '../../recipe-filter/dto';

class RecipeProductDto extends OmitType(CreateRecipeProductDto, ['recipe_id']) {}

class RecipeStepDto extends OmitType(CreateRecipeStepDto, ['recipe_id']) {}

class RecipeFilterDto extends OmitType(CreateRecipeFilterDto, ['recipe_id']) {}

export class CreateRecipeCombinedDto {
  @ValidateNested()
  readonly description: CreateRecipeDto;

  @ValidateNested()
  readonly ingredients: RecipeProductDto[];

  @ValidateNested()
  readonly steps: RecipeStepDto[];

  @ValidateNested()
  readonly filters: RecipeFilterDto[];
}
