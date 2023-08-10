import { IsDefined, IsNumber, IsString } from 'class-validator';

export class UpdateRecipeStepDto {
  @IsDefined()
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly content?: string;

  @IsDefined()
  @IsString()
  readonly img?: string;
}
