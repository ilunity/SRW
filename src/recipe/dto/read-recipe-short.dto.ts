import { RECIPE_STATUS } from '../entity/recipe-statuses';

export class ReadRecipeShortDto {
  readonly id: number;
  readonly title: string;
  readonly status: RECIPE_STATUS;
  readonly avg_rating: number | null;
  readonly favourites: number;
  readonly comments_number: number;
}
