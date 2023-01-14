import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavouriteRecipe } from './entity/favourite-recipe.entity';
import { CreateFavouriteRecipeDto } from './dto';
import { handleRowExist } from 'src/utils/row-existence-handlers';

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

  async remove(id: number): Promise<void> {
    const favourite = await this.favouriteRecipeModel.findByPk(id);

    return await favourite.destroy();
  }
}
