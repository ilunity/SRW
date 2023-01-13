import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateFilterDto {
  @IsDefined()
  @IsNumber()
  filter_type_id: number;

  @IsDefined()
  @IsString()
  name: string;
}
