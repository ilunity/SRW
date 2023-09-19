import { IsDefined, IsNumber } from 'class-validator';

export class CreateRecipeCategoryDto {
  @IsDefined()
  @IsNumber()
  readonly recipe_id: number;

  @IsDefined()
  @IsNumber()
  readonly category_id: number;
}
