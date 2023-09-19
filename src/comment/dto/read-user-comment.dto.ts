import { OmitType } from '@nestjs/swagger';
import { ReadCommentDto } from './read-comment.dto';

export class ReadUserCommentDto extends OmitType(ReadCommentDto, ['user']) {}
