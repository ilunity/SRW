import { User } from '../../user/entity/user.entity';
import { RECIPE_STATUS } from '../entity/recipe-statuses';
import { ReadRecipeProductDto } from '../../recipe-product/dto';
import { OmitType } from '@nestjs/swagger';
import { ReadRecipeCommentDto } from '../../comment/dto';
import { ReadCategoryDto } from '../../nested-category/dto';
import { ReadRecipeStepDto } from '../../recipe-step/dto';

class ProductsDto extends OmitType(ReadRecipeProductDto, ['recipe', 'id']) {}

export class ReadRecipeDto {
  readonly id: number;
  readonly title: string;
  readonly time: number;
  readonly avg_rating: number | null;
  readonly favourites: number;
  readonly img: string;
  readonly servings_number: number;
  readonly description: string;
  readonly status: RECIPE_STATUS;
  readonly user: User;
  readonly comments: ReadRecipeCommentDto[];
  readonly steps: ReadRecipeStepDto[];
  readonly products: ProductsDto[];
  readonly categories: ReadCategoryDto[];
}
