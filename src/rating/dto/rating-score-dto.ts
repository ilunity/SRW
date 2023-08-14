import { PickType } from '@nestjs/swagger';
import { RatingDto } from './rating.dto';

export class RatingScoreDto extends PickType(RatingDto, ['score']) {}
