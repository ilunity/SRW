import { User } from '../../user/entity/user.entity';
import { RECIPE_STATUS } from '../entity/recipe-statuses';
import { RecipeStep } from '../../recipe-step/entity/recipe-step.entity';
import { ReadRecipeProductDto } from '../../recipe-product/dto';
import { ReadRecipeFilterDto } from '../../recipe-filter/dto';
import { OmitType } from '@nestjs/swagger';
import { ReadCommentDto } from '../../comment/dto';

class ProductsDto extends OmitType(ReadRecipeProductDto, ['recipe']) {}

class FiltersDto extends OmitType(ReadRecipeFilterDto, ['recipe']) {}

export class ReadRecipeDto {
  readonly id: number;
  readonly title: string;
  readonly time: number;
  readonly avg_rating: number | null;
  readonly favourites: number | null;
  readonly img: string;
  readonly servings_number: number;
  readonly description: string;
  readonly status: RECIPE_STATUS;
  readonly user: User;
  readonly comments: ReadCommentDto[];
  readonly steps: RecipeStep[];
  readonly products: ProductsDto[];
  readonly filters: FiltersDto[];
}
