import { ReadRecipeDto } from './read-recipe.dto';
import { OmitType } from '@nestjs/swagger';

export class ReadRecipePreviewDto extends OmitType(ReadRecipeDto, [
  'categories',
  'steps',
  'comments',
]) {
  readonly comments_number: number;
}
