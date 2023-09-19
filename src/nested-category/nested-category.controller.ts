import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CategoryService } from './nested-category.service';
import { CreateCategoryDto, ReadCategoryDto, UpdateCategoryDto } from './dto';
import { NestedCategory } from './entity/nested-category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userRoleErrorHandler } from '../utils';
import { USER_ROLE } from '../user/entity/user-roles';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  /** Creates the Category */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto): Promise<NestedCategory> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);
    return this.categoryService.create(createCategoryDto);
  }

  /** Updates category by PK */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Request() req, @Body() updateCategoryDto: UpdateCategoryDto): Promise<NestedCategory> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);
    return this.categoryService.update(updateCategoryDto);
  }

  /** Returns all categories */
  @Get()
  getAll(): Promise<ReadCategoryDto[]> {
    return this.categoryService.getAll();
  }

  /** Returns category by id */
  @Get(':category_id')
  getOne(@Param('category_id') categoryId: number): Promise<ReadCategoryDto> {
    return this.categoryService.getOne(categoryId);
  }
}
