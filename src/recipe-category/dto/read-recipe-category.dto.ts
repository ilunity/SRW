import { Recipe } from '../../recipe/entity/recipe.entity';
import { NestedCategory } from '../../nested-category/entity/nested-category.entity';

export class ReadRecipeCategoryDto {
  readonly id: number;
  readonly recipe: Recipe;
  readonly category: NestedCategory;
}
