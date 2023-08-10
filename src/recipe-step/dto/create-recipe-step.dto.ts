import { IsDefined, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateRecipeStepDto {
  @IsDefined()
  @IsNumberString()
  readonly recipe_id: number;

  @IsDefined()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly img?: string;
}
