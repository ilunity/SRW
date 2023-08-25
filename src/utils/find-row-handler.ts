import { NotFoundException } from '@nestjs/common';

export const findRowHandler = async <ModelType>(
  query: () => Promise<ModelType>,
  rowTitle = 'Объект',
) => {
  const row = await query();
  if (!row) {
    throw new NotFoundException(`${rowTitle} не найден`);
  }

  return row;
};
