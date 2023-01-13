import { User } from '../../user/entity/user.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { RecipeProduct } from '../../recipe-product/entity/recipe-product.entity';
import { Rating } from '../../rating/entity/rating.entity';

export class RetrieveRecipeDto {
  readonly id: number;
  readonly title: string;
  // readonly reviews: number;
  readonly time: number;
  readonly rating: number | Rating[];
  readonly img: string;
  readonly serves_count: number;
  // readonly products_count: number;
  readonly description: string;
  readonly moderation_status: boolean;
  readonly user: User;
  readonly comments: Comment[];
  readonly products: RecipeProduct[];
}
