import { User } from '../user/entity/user.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { IsDefined, IsInt } from 'class-validator';

export class CreateSavedRecipeDto {
  @IsDefined()
  @IsInt()
  readonly user_id: number;

  @IsDefined()
  @IsInt()
  readonly recipe_id: number;
}

export class ReturnedSavedRecipeDto {
  readonly id: number;
  readonly user: User;
  readonly recipe: Recipe;
}

//todo Исправить все dto с использованием декораторов
