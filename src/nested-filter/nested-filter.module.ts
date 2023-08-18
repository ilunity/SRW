import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NestedFilter } from './entity/nested-filter.entity';
import { FilterController } from './nested-filter.controller';
import { FilterService } from './nested-filter.service';

@Module({
  imports: [SequelizeModule.forFeature([NestedFilter])],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
