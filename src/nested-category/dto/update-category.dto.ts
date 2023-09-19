import { IsDefined, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsDefined()
  @IsNumber()
  readonly id: number;

  @IsDefined()
  @IsString()
  readonly name: string;
}
