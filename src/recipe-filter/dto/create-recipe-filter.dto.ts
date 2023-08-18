import { IsDefined, IsNumber } from 'class-validator';

export class CreateRecipeFilterDto {
  @IsDefined()
  @IsNumber()
  readonly recipe_id: number;

  @IsDefined()
  @IsNumber()
  readonly filter_id: number;
}
