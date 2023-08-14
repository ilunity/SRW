import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavouriteRecipe } from './entity/favourite-recipe.entity';
import { FavouriteRecipeService } from './favourite-recipe.service';

@Module({
  imports: [SequelizeModule.forFeature([FavouriteRecipe])],
  providers: [FavouriteRecipeService],
  exports: [FavouriteRecipeService],
})
export class FavouriteRecipeModule {}
