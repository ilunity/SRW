import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeCategory } from './entity/recipe-category.entity';
import { CreateRecipeCategoryDto } from './dto';
import { CreateOptions } from 'sequelize';

@Injectable()
export class RecipeCategoryService {
  constructor(
    @InjectModel(RecipeCategory)
    private recipeCategoryModel: typeof RecipeCategory,
  ) {}

  async create(
    createRecipeCategoryDto: CreateRecipeCategoryDto,
    options?: CreateOptions,
  ): Promise<RecipeCategory> {
    return await this.recipeCategoryModel.create({ ...createRecipeCategoryDto }, options);
  }

  async remove(id: number) {
    const recipeCategory = await this.recipeCategoryModel.findByPk(id);
    return await recipeCategory.destroy();
  }
}
