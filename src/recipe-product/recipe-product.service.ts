import { Injectable } from '@nestjs/common';
import { RecipeProduct } from './entity/recipe-product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecipeProductDto } from './dto';
import { CreateOptions } from 'sequelize';

@Injectable()
export class RecipeProductService {
  constructor(
    @InjectModel(RecipeProduct)
    private recipeProductModel: typeof RecipeProduct,
  ) {}

  async create(
    createRecipeProductDto: CreateRecipeProductDto,
    options?: CreateOptions,
  ): Promise<RecipeProduct> {
    return await this.recipeProductModel.create({ ...createRecipeProductDto }, options);
  }

  async remove(id: number) {
    const recipeProduct = await this.recipeProductModel.findByPk(id);
    return await recipeProduct.destroy();
  }
}
