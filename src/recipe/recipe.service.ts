import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import { CreateRecipeDto, ReadRecipeDto, ReadRecipeIdsDto, UpdateRecipeStatusDto } from './dto';
import { User } from '../user/entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';
import { FileService, FileType } from '../file/file.service';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';
import { RECIPE_STATUS } from './entity/recipe-statuses';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeFilter } from '../recipe-filter/entity/recipe-filter.entity';
import { Rating } from '../rating/entity/rating.entity';
import { col, fn } from 'sequelize';
import { Product } from '../product/entity/product.entity';
import { Filter } from '../filter/entity/filter.entity';
import { UserService } from '../user/user.service';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe)
    private recipeModel: typeof Recipe,
    @InjectModel(RecipeStep)
    private recipeStepModel: typeof RecipeStep,
    @InjectModel(RecipeFilter)
    private recipeFilterModel: typeof RecipeFilter,
    @InjectModel(RecipeProduct)
    private recipeProductModel: typeof RecipeProduct,
    private userService: UserService,
    private fileService: FileService,
  ) {}

  async create(dto: CreateRecipeDto, img: Express.Multer.File): Promise<Recipe> {
    const imagePath = this.fileService.createFile(FileType.IMAGE, img);

    const user = await this.userService.findOne(dto.user_id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const recipe = await this.recipeModel.create({ ...dto, img: imagePath });
    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.findAll();
  }

  async findAllShared(): Promise<ReadRecipeDto[]> {
    return this.recipeModel.findAll({
      where: { status: RECIPE_STATUS.SHARED },
      include: [
        User,
        Comment,
        RecipeStep,
        {
          model: RecipeFilter,
          include: [Filter],
          attributes: {
            exclude: ['recipe_id', 'filter_id'],
          },
        },
        {
          model: RecipeProduct,
          include: [Product],
          attributes: {
            exclude: ['recipe_id', 'product_id'],
          },
        },
        {
          model: Rating,
          as: 'rating',
          attributes: [],
        },
        {
          model: FavouriteRecipe,
          as: 'favourite_recipes',
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [fn('AVG', col('rating.score')), 'avg_rating'],
          [fn('COUNT', col('favourite_recipes.id')), 'favourites'],
        ],
        exclude: ['user_id'],
      },
      group: [
        'Recipe.id',
        'user.id',
        'comments.id',
        'products.id',
        'steps.id',
        'filters.id',
        'products.product.id',
        'filters.filter.id',
      ],
    });
  }

  async findAllIds(): Promise<ReadRecipeIdsDto[]> {
    return this.recipeModel.findAll({
      where: {
        status: RECIPE_STATUS.SHARED,
      },
      attributes: ['id'],
    });
  }

  async findOne(id: number): Promise<ReadRecipeDto> {
    return this.recipeModel.findOne({
      where: { id },
      include: [
        User,
        Comment,
        RecipeStep,
        {
          model: RecipeFilter,
          include: [Filter],
          attributes: {
            exclude: ['recipe_id', 'filter_id'],
          },
        },
        {
          model: RecipeProduct,
          include: [Product],
          attributes: {
            exclude: ['recipe_id', 'product_id'],
          },
        },
        {
          model: Rating,
          as: 'rating',
          attributes: [],
        },
        {
          model: FavouriteRecipe,
          as: 'favourite_recipes',
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [fn('AVG', col('rating.score')), 'avg_rating'],
          [fn('COUNT', col('favourite_recipes.id')), 'favourites'],
        ],
        exclude: ['user_id'],
      },
      group: [
        'Recipe.id',
        'user.id',
        'comments.id',
        'products.id',
        'steps.id',
        'filters.id',
        'products.product.id',
        'filters.filter.id',
      ],
    });
  }

  async updateStatus(updateRecipeStatusDto: UpdateRecipeStatusDto): Promise<Recipe> {
    const { id, status } = updateRecipeStatusDto;
    const recipe = await this.recipeModel.findByPk(id);

    return await recipe.update({ status });
  }

  async remove(id: number): Promise<void> {
    await this.recipeStepModel.destroy({ where: { recipe_id: id } });
    await this.recipeFilterModel.destroy({ where: { recipe_id: id } });
    await this.recipeProductModel.destroy({ where: { recipe_id: id } });
    const recipe = await this.recipeModel.findOne({ where: { id } });
    await recipe.destroy();
  }
}
