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
