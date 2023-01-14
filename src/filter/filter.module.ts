import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilterType } from '../filter-type/entity/filter-type.entity';
import { FilterService } from './filter.service';
import { FilterTypeService } from '../filter-type/filter-type.service';
import { FilterController } from './filter.controller';
import { Filter } from './entity/filter.entity';

@Module({
  imports: [SequelizeModule.forFeature([Filter, FilterType])],
  controllers: [FilterController],
  providers: [FilterService, FilterTypeService],
})
export class FilterModule {}
