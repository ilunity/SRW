import { Recipe } from '../../recipe/entity/recipe.entity';
import { Filter } from '../../filter/entity/filter.entity';

export class ReadRecipeFilterDto {
  readonly id: number;
  readonly recipe: Recipe;
  readonly filter: Filter;
}
