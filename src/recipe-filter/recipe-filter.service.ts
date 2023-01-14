import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeFilter } from './entity/recipe-filter.entity';
import { CreateRecipeFilterDto } from './dto';

@Injectable()
export class RecipeFilterService {
  constructor(
    @InjectModel(RecipeFilter)
    private recipeFilterModel: typeof RecipeFilter,
  ) {}

  async create(createRecipeFilterDto: CreateRecipeFilterDto): Promise<RecipeFilter> {
    return await this.recipeFilterModel.create({ ...createRecipeFilterDto });
  }

  async remove(id: number) {
    const recipeFilter = await this.recipeFilterModel.findByPk(id);
    return await recipeFilter.destroy();
  }
}
