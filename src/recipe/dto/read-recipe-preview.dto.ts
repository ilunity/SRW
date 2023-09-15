import { ReadRecipeDto } from './read-recipe.dto';
import { OmitType } from '@nestjs/swagger';

export class ReadRecipePreviewDto extends OmitType(ReadRecipeDto, ['filters', 'steps']) {
  readonly comments_number: number;
}
