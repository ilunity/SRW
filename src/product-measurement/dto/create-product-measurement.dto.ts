import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateProductMeasurementDto {
  @IsDefined()
  @IsInt()
  readonly product_id: number;

  @IsDefined()
  @IsString()
  readonly measurement_type: string;
}
