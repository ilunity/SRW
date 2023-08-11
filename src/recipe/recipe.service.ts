import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import {
  CreateRecipeCombinedDto,
  CreateRecipeDto,
  ReadRecipeDto,
  ReadRecipeIdsDto,
  ReadRecipePreviewDto,
  UpdateRecipeStatusDto,
} from './dto';
import { User } from '../user/entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';
import { FileService } from '../file/file.service';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';
import { RECIPE_STATUS } from './entity/recipe-statuses';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeFilter } from '../recipe-filter/entity/recipe-filter.entity';
import { Rating } from '../rating/entity/rating.entity';
import { col, fn, Op, WhereOptions } from 'sequelize';
import { Product } from '../product/entity/product.entity';
import { UserService } from '../user/user.service';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { NestedFilter } from '../nested-filter/entity/nested-filter.entity';
import { Sequelize } from 'sequelize-typescript';
import { FilterKeys } from '../nested-filter/dto/get-filter.dto';
import { ITokenPayload } from '../auth/jwt.strategy';
import { RecipeProductService } from '../recipe-product/recipe-product.service';
import { RecipeStepService } from '../recipe-step/recipe-step.service';
import { RecipeFilterService } from '../recipe-filter/recipe-filter.service';

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
    @InjectModel(NestedFilter)
    private nestedFilterModel: typeof NestedFilter,
    private sequelize: Sequelize,
    private userService: UserService,
    private fileService: FileService,
    private recipeProductService: RecipeProductService,
    private recipeStepService: RecipeStepService,
    private recipeFilterService: RecipeFilterService,
  ) {}

  async create(user: ITokenPayload, dto: CreateRecipeDto): Promise<Recipe> {
    const imagePath = this.fileService.createFromBase64(dto.img);

    const recipe = await this.recipeModel.create({ ...dto, user_id: user.id, img: imagePath });
    return recipe;
  }

  async createCombined(user: ITokenPayload, dto: CreateRecipeCombinedDto): Promise<Recipe> {
    const recipe = await this.create(user, dto.description);

    for (const ingredient of dto.ingredients) {
      this.recipeProductService.create({ ...ingredient, recipe_id: recipe.id });
    }

    for (const step of dto.steps) {
      this.recipeStepService.create({ ...step, recipe_id: recipe.id });
    }

    for (const filter of dto.filters) {
      this.recipeFilterService.create({ ...filter, recipe_id: recipe.id });
    }

    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.findAll();
  }

  async findAllIds(): Promise<ReadRecipeIdsDto[]> {
    return this.recipeModel.findAll({
      where: {
        status: RECIPE_STATUS.SHARED,
      },
      attributes: ['id'],
    });
  }

  async find({
    filters = [],
    additionalClause,
  }: {
    filters?: FilterKeys[];
    additionalClause?: WhereOptions<Recipe>;
  }): Promise<ReadRecipePreviewDto[]> {
    const clause: WhereOptions = {
      ...additionalClause,
    };

    if (filters !== undefined) {
      clause['$filters.filter.left_key$'] = {
        [Op.and]: filters.map(({ left }) => ({ [Op.gte]: left })),
      };
      clause['$filters.filter.right_key$'] = {
        [Op.and]: filters?.map(({ right }) => ({ [Op.lte]: right })),
      };
    }

    return this.recipeModel.findAll({
      where: clause,
      include: [
        User,
        {
          model: RecipeProduct,
          include: [Product],
          attributes: {
            exclude: ['recipe_id', 'product_id'],
          },
        },
        {
          model: RecipeFilter,
          include: [NestedFilter],
          attributes: [],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: [],
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
          [fn('COUNT', col('comments.id')), 'comments_number'],
        ],
        exclude: ['user_id'],
      },
      group: [
        'Recipe.id',
        'user.id',
        'products.id',
        'products.product.id',
        'filters.id',
        'filters.filter.id',
      ],
    });
  }

  async findMy(payload: ITokenPayload): Promise<ReadRecipePreviewDto[]> {
    const user = await this.userService.findOne(payload.id);

    return this.find({
      additionalClause: { user_id: user.id },
    });
  }

  async findOne(id: number): Promise<ReadRecipeDto> {
    return this.recipeModel.findOne({
      where: { id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
          attributes: {
            exclude: ['recipe_id'],
          },
        },
        RecipeStep,
        {
          model: RecipeFilter,
          include: [NestedFilter],
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
        'comments.user.id',
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
