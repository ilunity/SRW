import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Filter } from './entity/filter.entity';
import { CreateFilterTypeDto } from '../filter-type/dto';
import { CreateFilterDto } from './dto';
import { FilterType } from '../filter-type/entity/filter-type.entity';

@Injectable()
export class FilterService {
  constructor(
    @InjectModel(Filter)
    private filterModel: typeof Filter,
  ) {}

  async create(createFilterDto: CreateFilterDto) {
    return await this.filterModel.create({ ...createFilterDto });
  }

  async findAll() {
    return await this.filterModel.findAll({
      include: [FilterType],
      attributes: {
        exclude: ['filter_type_id'],
      },
    });
  }

  async update(id: number, updateFilterDto: CreateFilterTypeDto) {
    const filterType = await this.filterModel.findByPk(id);
    return await filterType.update({ ...updateFilterDto });
  }

  async remove(id: number) {
    const filterType = await this.filterModel.findByPk(id);
    return await filterType.destroy();
  }
}
