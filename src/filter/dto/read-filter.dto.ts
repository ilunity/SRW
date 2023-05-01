import { Filter } from '../entity/filter.entity';

export class ReadFilterDto {
  readonly id: number;
  readonly name: string;
  readonly filters: Filter[];
}
