import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsDefined()
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly avatar?: string;
}
