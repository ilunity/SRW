import { User } from '../../user/entity/user.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { RecipeProduct } from '../../recipe-product/entity/recipe-product.entity';
import { Rating } from '../../rating/entity/rating.entity';

export class ReadRecipeDto {
  readonly id: number;
  readonly title: string;
  readonly time: number;
  readonly rating: number | Rating[];
  readonly img: string;
  readonly servings_number: number;
  readonly description: string;
  readonly moderation_status: boolean;
  readonly user: User;
  readonly comments: Comment[];
  readonly products: RecipeProduct[];
}
