import { WhereOptions } from 'sequelize';
import { ModelType } from '../model-type';

export const checkRowExist = async (model: ModelType<any>, where: WhereOptions) => {
  const probableRow = await model.findOne({ where });
  return !!probableRow;
};
