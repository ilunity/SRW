import { OmitType } from '@nestjs/swagger';
import { RatingDto } from './rating.dto';

export class GetRatingDto extends OmitType(RatingDto, ['score']) {}
