import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilterType } from './entity/filter-type.entity';
import { CreateFilterTypeDto } from './dto';

@Injectable()
export class FilterTypeService {
  constructor(
    @InjectModel(FilterType)
    private filterTypeModel: typeof FilterType,
  ) {}

  async create(createFilterTypeDto: CreateFilterTypeDto) {
    return await this.filterTypeModel.create({ ...createFilterTypeDto });
  }

  async findAll() {
    return await this.filterTypeModel.findAll();
  }

  async update(id: number, updateFilterTypeDto: CreateFilterTypeDto) {
    const filterType = await this.filterTypeModel.findByPk(id);
    return await filterType.update({ ...updateFilterTypeDto });
  }

  async remove(id: number) {
    const filterType = await this.filterTypeModel.findByPk(id);
    return await filterType.destroy();
  }
}
