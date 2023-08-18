import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavouriteRecipe } from './entity/favourite-recipe.entity';
import { FavouriteRecipeDto } from './dto';
import { handleRowExist } from 'src/utils/row-existence-handlers';

@Injectable()
export class FavouriteRecipeService {
  constructor(
    @InjectModel(FavouriteRecipe)
    private favouriteRecipeModel: typeof FavouriteRecipe,
  ) {}

  async create(createFavouriteRecipeDto: FavouriteRecipeDto) {
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
      where: { user_id: id },
    });
  }

  async find(favouriteRecipeDto: FavouriteRecipeDto): Promise<FavouriteRecipe | null> {
    return await this.favouriteRecipeModel.findOne({
      where: { ...favouriteRecipeDto },
    });
  }

  async remove(removeFavouriteRecipeDto: FavouriteRecipeDto): Promise<void> {
    await this.favouriteRecipeModel.destroy({
      where: { ...removeFavouriteRecipeDto },
    });
  }
}
