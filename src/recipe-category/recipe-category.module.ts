import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeCategory } from './entity/recipe-category.entity';
import { RecipeCategoryService } from './recipe-category.service';

@Module({
  imports: [SequelizeModule.forFeature([RecipeCategory])],
  providers: [RecipeCategoryService],
  exports: [RecipeCategoryService],
})
export class RecipeCategoryModule {}
