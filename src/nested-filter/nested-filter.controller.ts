import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { FilterService } from './nested-filter.service';
import { CreateFilterDto, GetFilterDto, ReadFiltersDto, UpdateFilterDto } from './dto';
import { NestedFilter } from './entity/nested-filter.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userRoleErrorHandler } from '../utils';
import { USER_ROLE } from '../user/entity/user-roles';

@ApiTags('Filter')
@Controller('filter')
export class FilterController {
  constructor(private filterService: FilterService) {}

  /** Creates the Filter */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createFilterDto: CreateFilterDto): Promise<NestedFilter> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);
    return this.filterService.create(createFilterDto);
  }

  /** Updates filter by PK */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Request() req, @Body() updateFilterDto: UpdateFilterDto): Promise<NestedFilter> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);
    return this.filterService.update(updateFilterDto);
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
