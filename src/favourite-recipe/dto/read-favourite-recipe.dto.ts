import { User } from '../../user/entity/user.entity';
import { Recipe } from '../../recipe/entity/recipe.entity';

export class ReadFavouriteRecipeDto {
  readonly id: number;
  readonly user: User;
  readonly recipe: Recipe;
}
