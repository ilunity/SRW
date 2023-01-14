import { USER_ROLE } from '../entity/user-roles';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { FavouriteRecipe } from '../../favourite-recipe/entity/favourite-recipe.entity';

export class ReadUserDto {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly role: USER_ROLE;
  readonly recipes: Recipe[];
  readonly comments: Comment[];
  readonly favourite_recipes: FavouriteRecipe[];
}
