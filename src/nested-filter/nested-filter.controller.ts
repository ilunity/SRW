import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { FilterService } from './nested-filter.service';
import { CreateFilterDto } from './dto';
import { NestedFilter } from './entity/nested-filter.entity';
import { ReadFiltersDto } from './dto/read-filters.dto';
import { GetFilterDto } from './dto/get-filter.dto';

@ApiTags('Filter')
@Controller('filter')
export class FilterController {
  constructor(private filterService: FilterService) {}

  /** Creates the Filter */
  @Post()
  create(@Body() createFilterDto: CreateFilterDto): Promise<NestedFilter> {
    return this.filterService.create(createFilterDto);
  }

  /** Returns all filters */
  @Get()
  getAll(): Promise<ReadFiltersDto[]> {
    return this.filterService.getAll();
  }

  /** Returns filter by filters_keys or id */
  @Post('search')
  getOne(@Body() getFilterDto: GetFilterDto): Promise<ReadFiltersDto> {
    return this.filterService.getOne(getFilterDto);
  }
}
