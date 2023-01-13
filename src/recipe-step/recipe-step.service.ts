import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeStep } from './entity/recipe-step.entity';
import { CreateRecipeStepDto } from './dto/create-recipe-step.dto';
import { FileService, FileType } from '../file/file.service';
import { UpdateRecipeStepDto } from './dto/update-recipe-step.dto';

@Injectable()
export class RecipeStepService {
  constructor(
    @InjectModel(RecipeStep)
    private recipeStepModel: typeof RecipeStep,
    private fileService: FileService,
  ) {}

  async create(
    createFavouriteRecipeDto: CreateRecipeStepDto,
    img: Express.Multer.File,
  ): Promise<RecipeStep> {
    const imagePath = this.fileService.createFile(FileType.IMAGE, img);
    const recipeStep = await this.recipeStepModel.create({
      ...createFavouriteRecipeDto,
      img: imagePath,
    });
    return recipeStep;
  }

  async updateContent(id: string, updateRecipeStepDto: UpdateRecipeStepDto): Promise<RecipeStep> {
    const recipeStep = await this.recipeStepModel.findByPk(id);
    return await recipeStep.update({ ...updateRecipeStepDto });
  }

  async updateImg(id: number, img: Express.Multer.File): Promise<RecipeStep> {
    const recipeStep = await this.recipeStepModel.findByPk(id);
    const imagePath = this.fileService.createFile(FileType.IMAGE, img);
    return await recipeStep.update({ img: imagePath });
  }

  async remove(id: string): Promise<void> {
    const favourite = await this.recipeStepModel.findByPk(id);
    return await favourite.destroy();
  }
}
