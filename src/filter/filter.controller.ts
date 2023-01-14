import { ApiTags } from '@nestjs/swagger';
import { FilterService } from './filter.service';
import { FilterTypeService } from '../filter-type/filter-type.service';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateFilterTypeDto } from '../filter-type/dto';
import { FilterType } from '../filter-type/entity/filter-type.entity';
import { CreateFilterDto } from './dto';
import { Filter } from './entity/filter.entity';

@ApiTags('Filter')
@Controller('filter')
export class FilterController {
  constructor(private filterService: FilterService, private filterTypeService: FilterTypeService) {}

  /** Creates the filter */
  @Post()
  create(@Body() createFilterDto: CreateFilterDto): Promise<Filter> {
    return this.filterService.create(createFilterDto);
  }

  /** Deletes the filter */
  @Delete(':filter_id')
  remove(@Param('filter_id') filterId: number) {
    return this.filterService.remove(filterId);
  }

  // ---------- filter types ----------

  /** Creates the filter type */
  @Post('type')
  createFilterType(@Body() createFilterTypeDto: CreateFilterTypeDto): Promise<FilterType> {
    return this.filterTypeService.create(createFilterTypeDto);
  }

  /** Deletes the filter type */
  @Delete('type/:filter_type_id')
  removeFilterType(@Param('filter_type_id') filterTypeId: number) {
    return this.filterTypeService.remove(filterTypeId);
  }
}
