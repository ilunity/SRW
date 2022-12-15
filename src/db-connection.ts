import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entity/user.entity';
import { Recipe } from './recipe/entity/recipe.entity';
import { Comment } from './comment/comment.entity';
import { Product } from './product/product.entity';
import { RecipeProduct } from './recipe-product/recipe-product.entity';
import { SavedRecipe } from './saved-recipe/saved-recipe.entity';
import { FavouriteRecipe } from './favourite-recipe/favourite-recipe.entity';
import { Rating } from './rating/entities/rating.entity';

export const DbConnection = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Recipe, Comment, Product, RecipeProduct, SavedRecipe, FavouriteRecipe, Rating],
  synchronize: true,
  autoLoadModels: true,
});
