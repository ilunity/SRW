import { Recipe } from '../../recipe/entity/recipe.entity';
import { User } from '../../user/entity/user.entity';

export class ReadRatingDto {
  readonly score: number;
  readonly user: User;
  readonly recipe: Recipe;
}
