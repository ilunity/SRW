import { ReadRecipeDto } from './read-recipe.dto';

export type ReadRecipePreviewDto = Omit<ReadRecipeDto, 'filters' | 'steps'> & {
  readonly comments_number: number;
};
