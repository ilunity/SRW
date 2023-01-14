import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import { FileService } from '../file/file.service';
import { RecipeStepService } from '../recipe-step/recipe-step.service';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeFilter } from '../recipe-filter/entity/recipe-filter.entity';
import { RecipeFilterService } from '../recipe-filter/recipe-filter.service';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, RecipeStep, RecipeFilter])],
  controllers: [RecipeController],
  providers: [RecipeService, FileService, RecipeStepService, RecipeFilterService],
})
export class RecipeModule {}
