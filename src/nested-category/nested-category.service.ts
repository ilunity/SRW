import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NestedCategory } from './entity/nested-category.entity';
import { CreateCategoryDto, ReadCategoryDto, UpdateCategoryDto } from './dto';
import { Op } from 'sequelize';
import { findRowHandler } from '../utils';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(NestedCategory)
    private nestedCategoryModel: typeof NestedCategory,
    private sequelize: Sequelize,
  ) {}

  async create({ parent_id, name }: CreateCategoryDto): Promise<NestedCategory> {
    if (!parent_id) {
      const maxRightKey: number = (await this.nestedCategoryModel.max('right_key')) || 0;
      const category = await this.nestedCategoryModel.create({
        left_key: maxRightKey + 1,
        right_key: maxRightKey + 2,
        level: 0,
        name,
        parent_id: null,
      });

      return category;
    }

    const { right_key: parentRightKey, level: parentLevel } = await findRowHandler(() =>
      this.nestedCategoryModel.findByPk(parent_id),
    );

    const category = await this.sequelize.transaction(async (transaction) => {
      try {
        await this.nestedCategoryModel.increment(
          { left_key: 2, right_key: 2 },
          {
            where: {
              left_key: { [Op.gt]: parentRightKey },
            },
            transaction,
          },
        );

        await this.nestedCategoryModel.increment(
          { right_key: 2 },
          {
            where: {
              right_key: { [Op.gte]: parentRightKey },
              left_key: { [Op.lt]: parentRightKey },
            },
            transaction,
          },
        );

        const category = await this.nestedCategoryModel.create(
          {
            left_key: parentRightKey,
            right_key: parentRightKey + 1,
            level: parentLevel + 1,
            name,
            parent_id,
          },
          {
            transaction,
          },
        );

        return category;
      } catch (error) {
        throw new InternalServerErrorException('Не удалось добавить фильтр');
      }
    });

    return category;
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<NestedCategory> {
    const category = await findRowHandler(
      () => this.nestedCategoryModel.findByPk(updateCategoryDto.id),
      'Фильтр',
    );

    return category.update(updateCategoryDto);
  }

  async getAll(): Promise<ReadCategoryDto[]> {
    const categories = await this.nestedCategoryModel.findAll({
      order: ['left_key'],
    });

    const pushStackChild = (
      categories: ReadCategoryDto[],
      level: number,
      child: ReadCategoryDto,
    ) => {
      const lastCategory = categories[categories.length - 1];

      if (level === 1) {
        return lastCategory.children.push({ ...child, parent_id: lastCategory.id });
      }

      pushStackChild(lastCategory.children, level - 1, child);
    };

    const stack: ReadCategoryDto[] = [];
    for (let i = 0; i < categories.length; i++) {
      const { id, name, level, left_key, right_key } = categories[i];

      const newCategory: ReadCategoryDto = {
        id,
        left_key,
        right_key,
        parent_id: null,
        name,
        level,
        children: [],
      };

      if (level === 0) {
        stack.push(newCategory);
        continue;
      }

      pushStackChild(stack, level, newCategory);
    }

    return stack;
  }

  async getOne(id: number): Promise<ReadCategoryDto> {
    return await this.nestedCategoryModel.findByPk(id);
  }
}
