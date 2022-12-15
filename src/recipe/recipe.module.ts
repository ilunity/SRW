import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import { FileService } from '../file/file.service';

@Module({
  imports: [SequelizeModule.forFeature([Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService, FileService],
})
export class RecipeModule {}
