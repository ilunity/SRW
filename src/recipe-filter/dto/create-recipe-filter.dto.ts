import { IsDefined, IsInt } from 'class-validator';

export class CreateRecipeFilterDto {
  @IsDefined()
  @IsInt()
  readonly recipe_id: number;

  @IsDefined()
  @IsInt()
  readonly filter_id: number;
}
