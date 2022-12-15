import { PUBLIC_ROLES } from '../entity/public-roles';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { Comment } from '../../comment/comment.entity';
import { SavedRecipe } from '../../saved-recipe/saved-recipe.entity';
import { FavouriteRecipe } from '../../favourite-recipe/favourite-recipe.entity';

export class RetrieveUserDto {
  readonly id: number;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly role: PUBLIC_ROLES;
  readonly recipes: Recipe[];
  readonly comments: Comment[];
  readonly saved_recipes: SavedRecipe[];
  readonly favourite_recipes: FavouriteRecipe[];
}
