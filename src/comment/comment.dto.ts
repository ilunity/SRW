import { User } from '../user/entity/user.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsDefined()
  @IsString()
  readonly text: string;

  @IsDefined()
  @IsInt()
  readonly user_id: number;

  @IsDefined()
  @IsInt()
  readonly recipe_id: number;
}

export class ReturnedCommentDto {
  readonly id: number;
  readonly text: string;
  readonly user: User;
  readonly recipe: Recipe;
}
