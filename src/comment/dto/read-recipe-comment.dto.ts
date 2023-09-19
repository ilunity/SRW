import { OmitType } from '@nestjs/swagger';
import { ReadCommentDto } from './read-comment.dto';

export class ReadRecipeCommentDto extends OmitType(ReadCommentDto, ['recipe']) {}
