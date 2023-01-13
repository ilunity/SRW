import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavouriteRecipe } from './entity/favourite-recipe.entity';
import { CreateFavouriteRecipeDto } from './dto';
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

  async findAll() {
    return await this.favouriteRecipeModel.findAll();
  }

  async findByUser(id: number) {
    return await this.favouriteRecipeModel.findAll({
      where: { userId: id },
    });
  }

  async remove(id: string): Promise<void> {
    const favourite = await this.favouriteRecipeModel.findByPk(id);

    return await favourite.destroy();
  }
}
