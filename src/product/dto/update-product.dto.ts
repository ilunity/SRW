import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsDefined()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  img?: string;
}
