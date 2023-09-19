import { Module } from '@nestjs/common';
import { RecipeProduct } from './entity/recipe-product.entity';
import { RecipeProductService } from './recipe-product.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([RecipeProduct])],
  providers: [RecipeProductService],
  exports: [RecipeProductService],
})
export class RecipeProductModule {}
