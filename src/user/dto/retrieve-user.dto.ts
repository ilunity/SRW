import { PUBLIC_ROLES } from '../entity/public-roles';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { FavouriteRecipe } from '../../favourite-recipe/entity/favourite-recipe.entity';

export class RetrieveUserDto {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly role: PUBLIC_ROLES;
  readonly recipes: Recipe[];
  readonly comments: Comment[];
  readonly favourite_recipes: FavouriteRecipe[];
}
