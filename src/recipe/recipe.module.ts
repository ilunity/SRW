import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeCategory } from '../recipe-category/entity/recipe-category.entity';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';
import { Rating } from '../rating/entity/rating.entity';
import { Product } from '../product/entity/product.entity';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { NestedCategory } from '../nested-category/entity/nested-category.entity';
import { CommentModule } from '../comment/comment.module';
import { FavouriteRecipeModule } from '../favourite-recipe/favourite-recipe.module';
import { RatingModule } from '../rating/rating.module';
import { RecipeProductModule } from '../recipe-product/recipe-product.module';
import { RecipeStepModule } from '../recipe-step/recipe-step.module';
import { RecipeCategoryModule } from '../recipe-category/recipe-category.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Recipe,
      RecipeStep,
      RecipeCategory,
      RecipeProduct,
      Rating,
      Product,
      NestedCategory,
    ]),
    UserModule,
    FileModule,
    CommentModule,
    FavouriteRecipeModule,
    RatingModule,
    RecipeProductModule,
    RecipeStepModule,
    RecipeCategoryModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
