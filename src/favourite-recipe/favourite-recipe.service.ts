import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavouriteRecipe } from './favourite-recipe.entity';
import { CreateFavouriteRecipeDto } from './favourite-recipe.dto';
import { handleRowExist } from '../utils';

@Injectable()
export class FavouriteRecipeService {
  constructor(
    @InjectModel(FavouriteRecipe)
    private favouriteRecipeModel: typeof FavouriteRecipe,
  ) {}

  async create(createFavouriteRecipeDto: CreateFavouriteRecipeDto) {
    await handleRowExist(this.favouriteRecipeModel, {
      ...createFavouriteRecipeDto,
    });

    return await this.favouriteRecipeModel.create({ ...createFavouriteRecipeDto });
  }

  async remove(id: string): Promise<void> {
    const favourite = await this.favouriteRecipeModel.findByPk(id);

    return await favourite.destroy();
  }
}
