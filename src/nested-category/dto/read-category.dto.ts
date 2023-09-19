export class ReadCategoryDto {
  readonly id: number;
  readonly left_key: number;
  readonly right_key: number;
  readonly parent_id: number | null;
  readonly level: number;
  readonly name: string;
  readonly children: ReadCategoryDto[];
}
