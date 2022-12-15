import { IsDefined, IsInt } from 'class-validator';

export class UpdateRatingDto {
  @IsDefined()
  @IsInt()
  readonly score: number;
}
