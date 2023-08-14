import { IsDefined, IsInt, Max, Min } from 'class-validator';

const MIN_RATE = 1;
const MAX_RATE = 5;

export class RatingDto {
  @IsDefined()
  @IsInt()
  @Min(MIN_RATE)
  @Max(MAX_RATE)
  readonly score: number;

  @IsDefined()
  @IsInt()
  readonly user_id: number;

  @IsDefined()
  @IsInt()
  readonly recipe_id: number;
}
