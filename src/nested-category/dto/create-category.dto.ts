import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsDefined()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly parent_id: number;
}
