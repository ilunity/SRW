import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './entity/recipe.entity';
import { RecipeStepService } from '../recipe-step/recipe-step.service';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeFilter } from '../recipe-filter/entity/recipe-filter.entity';
import { RecipeFilterService } from '../recipe-filter/recipe-filter.service';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';
import { RecipeProductService } from '../recipe-product/recipe-product.service';
import { Rating } from '../rating/entity/rating.entity';
import { Product } from '../product/entity/product.entity';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { NestedFilter } from '../nested-filter/entity/nested-filter.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Recipe,
      RecipeStep,
      RecipeFilter,
      RecipeProduct,
      Rating,
      Product,
      NestedFilter,
    ]),
    UserModule,
    FileModule,
  ],
  controllers: [RecipeController],
  providers: [
    RecipeService,
    RecipeStepService,
    RecipeFilterService,
    RecipeProductService,
    RecipeProductService,
    RecipeStepService,
  ],
})
export class RecipeModule {}
