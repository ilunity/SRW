import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { FavouriteRecipeService } from '../favourite-recipe/favourite-recipe.service';
import { RatingService } from '../rating/rating.service';
import { Rating } from '../rating/entity/rating.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Comment, Recipe, FavouriteRecipe, Rating])],
  controllers: [UserController],
  providers: [UserService, CommentService, FavouriteRecipeService, RatingService],
})
export class UserModule {}
