import { WhereOptions } from 'sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';
import { checkRowExist } from './check-row-exist';
import { ModelType } from '../model-type';

export const handleRowNotExist = async (model: ModelType<any>, where: WhereOptions) => {
  const isRowAlreadyExist = await checkRowExist(model, where);

  if (!isRowAlreadyExist) {
    throw new HttpException(
      `Required row in ${model.tableName} table doesn't exists`,
      HttpStatus.NOT_FOUND,
    );
  }
};
