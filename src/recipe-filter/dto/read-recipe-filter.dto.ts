import { Recipe } from '../../recipe/entity/recipe.entity';
import { NestedFilter } from '../../nested-filter/entity/nested-filter.entity';

export class ReadRecipeFilterDto {
  readonly id: number;
  readonly recipe: Recipe;
  readonly filter: NestedFilter;
}
