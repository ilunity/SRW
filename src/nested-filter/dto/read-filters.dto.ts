export class ReadFiltersDto {
  readonly id: number;
  readonly parent_id: number | null;
  readonly left_key: number;
  readonly right_key: number;
  readonly level: number;
  readonly name: string;
  readonly children: ReadFiltersDto[];
}
