import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterKeys } from '../../nested-filter/dto/get-filter.dto';

export class GetSharedRecipe {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterKeys)
  readonly filters_keys: FilterKeys[];
}
