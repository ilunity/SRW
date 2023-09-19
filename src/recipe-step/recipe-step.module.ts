import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeStep } from './entity/recipe-step.entity';
import { RecipeStepService } from './recipe-step.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([RecipeStep]), FileModule],
  providers: [RecipeStepService],
  exports: [RecipeStepService],
})
export class RecipeStepModule {}
