import { User } from '../user/entity/user.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { IsDefined, IsInt } from 'class-validator';

export class CreateFavouriteRecipeDto {
  @IsDefined()
  @IsInt()
  readonly user_id: number;

  @IsDefined()
  @IsInt()
  readonly recipe_id: number;
}

export class ReturnedFavouriteRecipeDto {
  readonly id: number;
  readonly user: User;
  readonly recipe: Recipe;
}
