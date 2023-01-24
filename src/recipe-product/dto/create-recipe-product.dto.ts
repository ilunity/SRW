import { IsDefined, IsEnum, IsInt } from 'class-validator';
import { MEASUREMENT_TYPE } from '../entity/mesurement-types';

export class CreateRecipeProductDto {
  @IsDefined()
  @IsInt()
  readonly recipe_id: number;

  @IsDefined()
  @IsInt()
  readonly product_id: number;

  @IsDefined()
  @IsEnum(MEASUREMENT_TYPE)
  readonly measurement_type: MEASUREMENT_TYPE;

  @IsDefined()
  @IsInt()
  readonly measurement_value: number;
}
