import { ReadProfileDto } from './read-profile.dto';

export class ReadRegisterDto extends ReadProfileDto {
  readonly token: string;
}
