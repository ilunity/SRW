import { IsDefined, IsEnum, IsInt } from 'class-validator';
import { RECIPE_STATUS } from '../entity/recipe-statuses';

export class UpdateRecipeStatusDto {
  @IsDefined()
  @IsInt()
  readonly id: number;

  @IsDefined()
  @IsEnum(RECIPE_STATUS)
  readonly status: RECIPE_STATUS;
}
