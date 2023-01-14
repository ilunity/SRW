import { Injectable } from '@nestjs/common';
import { RecipeProduct } from './entity/recipe-product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecipeProductDto } from './dto';

@Injectable()
export class RecipeProductService {
  constructor(
    @InjectModel(RecipeProduct)
    private recipeProductModel: typeof RecipeProduct,
  ) {}

  async create(createRecipeProductDto: CreateRecipeProductDto): Promise<RecipeProduct> {
    return await this.recipeProductModel.create({ ...createRecipeProductDto });
  }

  async remove(id: number) {
    const recipeProduct = await this.recipeProductModel.findByPk(id);
    return await recipeProduct.destroy();
  }
}
