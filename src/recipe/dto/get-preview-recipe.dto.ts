import { IsArray, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RECIPE_STATUS } from '../entity/recipe-statuses';
import { RECIPE_BELONGING } from '../recipe.service';

export class GetPreviewRecipe {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((categorieId) => Number(categorieId)),
  )
  @ApiProperty({ type: [Number], format: 'form' })
  readonly categories?: number[];

  @IsOptional()
  @IsEnum(RECIPE_STATUS)
  readonly status?: RECIPE_STATUS;

  @IsOptional()
  @IsEnum(RECIPE_BELONGING)
  readonly belongTo?: RECIPE_BELONGING;
}
