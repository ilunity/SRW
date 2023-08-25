import { IsDefined, IsNumber, IsString } from 'class-validator';

export class UpdateFilterDto {
  @IsDefined()
  @IsNumber()
  readonly id: number;

  @IsDefined()
  @IsString()
  readonly name: string;
}
