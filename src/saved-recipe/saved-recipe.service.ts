import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SavedRecipe } from './saved-recipe.entity';
import { CreateSavedRecipeDto } from './saved-recipe.dto';
import { handleRowExist } from '../utils';

@Injectable()
export class SavedRecipeService {
  constructor(
    @InjectModel(SavedRecipe)
    private savedRecipeModel: typeof SavedRecipe,
  ) {}

  async create(createSavedRecipeDto: CreateSavedRecipeDto) {
    await handleRowExist(this.savedRecipeModel, {
      ...createSavedRecipeDto,
    });

    return await this.savedRecipeModel.create({ ...createSavedRecipeDto });
  }

  async remove(id: string): Promise<void> {
    const saved = await this.savedRecipeModel.findByPk(id);

    return await saved.destroy();
  }
}
