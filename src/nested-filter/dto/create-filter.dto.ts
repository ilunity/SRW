import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFilterDto {
  @IsDefined()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly parent_id: number;
}
