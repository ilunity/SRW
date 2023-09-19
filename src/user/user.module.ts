import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { Rating } from '../rating/entity/rating.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { FileModule } from '../file/file.module';
import { FavouriteRecipeModule } from '../favourite-recipe/favourite-recipe.module';
import { CommentModule } from '../comment/comment.module';
import { RatingModule } from '../rating/rating.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Comment, Recipe, FavouriteRecipe, Rating]),
    FileModule,
    FavouriteRecipeModule,
    CommentModule,
    RatingModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
