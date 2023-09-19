import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NestedCategory } from './entity/nested-category.entity';
import { CategoryController } from './nested-category.controller';
import { CategoryService } from './nested-category.service';

@Module({
  imports: [SequelizeModule.forFeature([NestedCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
