import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NestedFilter } from './entity/nested-filter.entity';
import { CreateFilterDto } from './dto';
import { Op } from 'sequelize';
import { ReadFiltersDto } from './dto/read-filters.dto';
import { GetFilterDto } from './dto/get-filter.dto';

@Injectable()
export class FilterService {
  constructor(
    @InjectModel(NestedFilter)
    private filterModel: typeof NestedFilter,
  ) {}

  async create({ parent_id, name }: CreateFilterDto): Promise<NestedFilter> {
    if (!parent_id) {
      const maxRightKey: number = (await this.filterModel.max('right_key')) || 0;
      const filter = await this.filterModel.create({
        left_key: maxRightKey + 1,
        right_key: maxRightKey + 2,
        level: 0,
        name,
        parent_id: null,
      });

      return filter;
    }

    const { right_key: parentRightKey, level: parentLevel } = await this.filterModel.findByPk(
      parent_id,
    );

    await this.filterModel.increment(
      { left_key: 2, right_key: 2 },
      {
        where: {
          left_key: { [Op.gt]: parentRightKey },
        },
      },
    );

    await this.filterModel.increment(
      { right_key: 2 },
      {
        where: {
          right_key: { [Op.gte]: parentRightKey },
          left_key: { [Op.lt]: parentRightKey },
        },
      },
    );

    const filter = await this.filterModel.create({
      left_key: parentRightKey,
      right_key: parentRightKey + 1,
      level: parentLevel + 1,
      name,
      parent_id,
    });

    return filter;
  }

  async getAll(): Promise<ReadFiltersDto[]> {
    const filters = await this.filterModel.findAll({
      order: ['left_key'],
    });

    const pushStackChild = (filters: ReadFiltersDto[], level: number, child: ReadFiltersDto) => {
      const lastFilter = filters[filters.length - 1];

      if (level === 1) {
        return lastFilter.children.push({ ...child, parent_id: lastFilter.id });
      }

      pushStackChild(lastFilter.children, level - 1, child);
    };

    const stack: ReadFiltersDto[] = [];
    for (let i = 0; i < filters.length; i++) {
      const { id, left_key, right_key, name, level } = filters[i];

      const newFilter: ReadFiltersDto = {
        id,
        parent_id: null,
        left_key,
        right_key,
        name,
        level,
        children: [],
      };

      if (level === 0) {
        stack.push(newFilter);
        continue;
      }

      pushStackChild(stack, level, newFilter);
    }

    return stack;
  }

  async getOne(getFilterDto: GetFilterDto): Promise<ReadFiltersDto> {
    if (getFilterDto.id) {
      return await this.filterModel.findByPk(getFilterDto.id);
    }

    if (getFilterDto.filters_keys) {
      const { left: left_key, right: right_key } = getFilterDto.filters_keys;
      return await this.filterModel.findOne({
        where: { left_key, right_key },
      });
    }

    return null;
  }
}
