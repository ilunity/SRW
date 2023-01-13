import { IsDefined, IsString } from 'class-validator';

export class CreateFilterTypeDto {
  @IsDefined()
  @IsString()
  readonly name: string;
}
