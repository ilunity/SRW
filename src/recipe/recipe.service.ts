import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import { CreateRecipeDto, RetrieveRecipeDto } from './dto';
import { User } from '../user/entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';
import { FileService, FileType } from '../file/file.service';
import { Sequelize } from 'sequelize-typescript';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe)
    private recipeModel: typeof Recipe,
    private fileService: FileService,
    private sequelize: Sequelize,
  ) {}

  async create(dto: CreateRecipeDto, img: Express.Multer.File): Promise<Recipe> {
    const imagePath = this.fileService.createFile(FileType.IMAGE, img);
    const recipe = await this.recipeModel.create({ ...dto, img: imagePath });
    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.findAll();
  }

  async findOne(id: string): Promise<RetrieveRecipeDto> {
    return this.recipeModel.findOne({
      where: { id },
      include: [User, Comment, RecipeProduct],
      attributes: {
        exclude: ['user_id'],
        include: [
          [
            this.sequelize.literal(`(
              SELECT AVG("score")
              FROM "Ratings" AS "rating"
              WHERE "rating"."recipe_id" = "Recipe"."id"
            )`),
            'rating',
          ],
        ],
      },
    });
  }

  async remove(id: string): Promise<void> {
    const recipe = await this.recipeModel.findOne({ where: { id } });
    await recipe.destroy();
  }
}
