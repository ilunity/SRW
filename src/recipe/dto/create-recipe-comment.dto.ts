import { OmitType } from '@nestjs/swagger';
import { CreateCommentDto } from '../../comment/dto';

export class CreateRecipeCommentDto extends OmitType(CreateCommentDto, ['recipe_id', 'user_id']) {}
