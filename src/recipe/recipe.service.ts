import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import { CreateRecipeDto, ReadRecipeDto, ReadRecipePreviewDto, UpdateRecipeStatusDto } from './dto';
import { User } from '../user/entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';
import { FileService } from '../file/file.service';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeCategory } from '../recipe-category/entity/recipe-category.entity';
import { Rating } from '../rating/entity/rating.entity';
import { col, FindOptions, fn, Op, WhereOptions } from 'sequelize';
import { Product } from '../product/entity/product.entity';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { NestedCategory } from '../nested-category/entity/nested-category.entity';
import { Sequelize } from 'sequelize-typescript';
import { RecipeProductService } from '../recipe-product/recipe-product.service';
import { RecipeStepService } from '../recipe-step/recipe-step.service';
import { IUserPayload } from '../auth/jwt-strategies';
import { RecipeCategoryService } from '../recipe-category/recipe-category.service';

export enum RECIPE_BELONGING {
  MY = 'MY',
  FAVOURITE = 'FAVOURITE',
}

@Injectable()
export class RecipeService {
  readRecipeOptions: FindOptions = {
    include: [
      User,
      {
        model: Comment,
        include: [User],
        attributes: {
          exclude: ['recipe_id', 'user_id'],
        },
      },
      {
        model: RecipeStep,
        attributes: {
          exclude: ['recipe_id'],
        },
      },
      {
        model: NestedCategory,
        through: {
          attributes: [],
        },
      },
      {
        model: RecipeProduct,
        include: [Product],
        attributes: {
          exclude: ['recipe_id', 'product_id', 'id'],
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
        [fn('COUNT', fn('DISTINCT', col('favourite_recipes.id'))), 'favourites'],
      ],
      exclude: ['user_id'],
    },
    group: [
      'Recipe.id',
      'user.id',
      'comments.id',
      'products.id',
      'steps.id',
      'categories.id',
      'products.product.id',
      'comments.user.id',
    ],
  };

  constructor(
    @InjectModel(Recipe)
    private recipeModel: typeof Recipe,
    @InjectModel(RecipeStep)
    private recipeStepModel: typeof RecipeStep,
    @InjectModel(RecipeCategory)
    private recipeCategoryModel: typeof RecipeCategory,
    @InjectModel(RecipeProduct)
    private recipeProductModel: typeof RecipeProduct,
    @InjectModel(NestedCategory)
    private nestedCategoryModel: typeof NestedCategory,
    private sequelize: Sequelize,
    private fileService: FileService,
    private recipeProductService: RecipeProductService,
    private recipeStepService: RecipeStepService,
    private recipeCategoryService: RecipeCategoryService,
  ) {}

  async create(user: IUserPayload, dto: CreateRecipeDto): Promise<Recipe> {
    const {
      ingredients: ingredientsDto,
      steps: stepsDto,
      categories: categoriesDto,
      ...recipeDto
    } = dto;

    const recipe = await this.sequelize.transaction(async (transaction) => {
      try {
        const imagePath = this.fileService.createImageFromBase64(recipeDto.img);
        const recipe = await this.recipeModel.create(
          {
            ...recipeDto,
            user_id: user.id,
            img: imagePath,
          },
          { transaction },
        );

        for (const ingredient of ingredientsDto) {
          this.recipeProductService.create(
            { ...ingredient, recipe_id: recipe.id },
            { transaction },
          );
        }

        for (const step of stepsDto) {
          this.recipeStepService.create({ ...step, recipe_id: recipe.id }, { transaction });
        }

        for (const category of categoriesDto) {
          this.recipeCategoryService.create(
            { category_id: category, recipe_id: recipe.id },
            { transaction },
          );
        }

        return recipe;
      } catch (error) {
        throw new InternalServerErrorException('Не удалось добавить рецепт');
      }
    });

    return recipe;
  }

  async findAll(): Promise<ReadRecipeDto[]> {
    return this.recipeModel.findAll(this.readRecipeOptions);
  }

  async find({
    categories = [],
    additionalClause,
    belongTo,
  }: {
    categories?: number[];
    additionalClause?: WhereOptions<Recipe>;
    belongTo?: {
      type: RECIPE_BELONGING;
      user: IUserPayload;
    };
  }): Promise<ReadRecipePreviewDto[]> {
    const clause: WhereOptions = {
      ...additionalClause,
    };

    if (categories.length !== 0) {
      const categories_keys = await this.nestedCategoryModel.findAll({
        where: {
          id: { [Op.in]: categories },
        },
        attributes: ['left_key', 'right_key'],
      });

      clause[Op.or] = categories_keys.map(({ left_key, right_key }) => ({
        '$categories.left_key$': { [Op.gte]: left_key },
        '$categories.right_key$': { [Op.lte]: right_key },
      }));
    }

    if (belongTo?.type === RECIPE_BELONGING.MY) {
      clause['user_id'] = belongTo.user.id;
    }

    if (belongTo) {
      if (belongTo.type === RECIPE_BELONGING.MY) {
        clause['user_id'] = belongTo.user.id;
      }

      if (belongTo.type === RECIPE_BELONGING.FAVOURITE) {
        clause['$favourite_recipes.user_id$'] = belongTo.user.id;
      }
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
          model: NestedCategory,
          through: {
            attributes: [],
          },
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
          [fn('COUNT', fn('DISTINCT', col('favourite_recipes.id'))), 'favourites'],
          [fn('COUNT', fn('DISTINCT', col('comments.id'))), 'comments_number'],
        ],
        exclude: ['user_id'],
      },
      group: [
        'Recipe.id',
        'favourite_recipes.id',
        'user.id',
        'products.id',
        'products.product.id',
        'categories.id',
        'categories.RecipeCategory.category_id',
      ],
    });
  }

  async findOne(id: number): Promise<ReadRecipeDto> {
    return this.recipeModel.findByPk(id, this.readRecipeOptions);
  }

  async updateStatus(updateRecipeStatusDto: UpdateRecipeStatusDto): Promise<Recipe> {
    const { id, status } = updateRecipeStatusDto;
    const recipe = await this.recipeModel.findByPk(id);

    return await recipe.update({ status });
  }

  async remove(id: number): Promise<void> {
    await this.recipeStepModel.destroy({ where: { recipe_id: id } });
    await this.recipeCategoryModel.destroy({ where: { recipe_id: id } });
    await this.recipeProductModel.destroy({ where: { recipe_id: id } });
    const recipe = await this.recipeModel.findOne({ where: { id } });
    await recipe.destroy();
  }
}
