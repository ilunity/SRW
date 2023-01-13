import { IsDefined, IsInt } from 'class-validator';

export class CreateFavouriteRecipeDto {
  @IsDefined()
  @IsInt()
  readonly user_id: number;

  @IsDefined()
  @IsInt()
  readonly recipe_id: number;
}
