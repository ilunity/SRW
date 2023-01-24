import { MEASUREMENT_TYPE } from '../entity/mesurement-types';
import { Product } from '../../product/entity/product.entity';
import { Recipe } from '../../recipe/entity/recipe.entity';

export class ReadRecipeProductDto {
  readonly id: number;
  readonly measurement_type: MEASUREMENT_TYPE;
  readonly measurement_value: number;
  readonly recipe: Recipe;
  readonly product: Product;
}
