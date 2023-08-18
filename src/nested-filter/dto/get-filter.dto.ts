import { IsNumber, IsNumberString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterKeys {
  @IsNumber()
  readonly left: number;

  @IsNumber()
  readonly right: number;
}

export class GetFilterDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterKeys)
  readonly filters_keys: FilterKeys;

  @IsOptional()
  @IsNumberString()
  readonly id: number;
}
