import { WhereOptions } from 'sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';
import { checkRowExist } from './check-row-exist';

export const handleRowExist = async (model, where: WhereOptions) => {
  const isRowAlreadyExist = await checkRowExist(model, where);

  if (isRowAlreadyExist) {
    throw new HttpException('Row already exists', HttpStatus.CONFLICT);
  }
};
