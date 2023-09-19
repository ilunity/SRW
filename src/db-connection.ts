import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entity/user.entity';
import { Recipe } from './recipe/entity/recipe.entity';
import { Comment } from './comment/entity/comment.entity';
import { Product } from './product/entity/product.entity';
import { RecipeProduct } from './recipe-product/entity/recipe-product.entity';
import { FavouriteRecipe } from './favourite-recipe/entity/favourite-recipe.entity';
import { Rating } from './rating/entity/rating.entity';
import { RecipeStep } from './recipe-step/entity/recipe-step.entity';
import { RecipeCategory } from './recipe-category/entity/recipe-category.entity';
import { NestedCategory } from './nested-category/entity/nested-category.entity';

export const DbConnection = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [
    User,
    Comment,
    Product,
    RecipeProduct,
    NestedCategory,
    RecipeStep,
    Recipe,
    RecipeCategory,
    FavouriteRecipe,
    Rating,
  ],
  synchronize: true,
  autoLoadModels: true,
});
