import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from './entity/rating.entity';
import { RatingService } from './rating.service';
import { Recipe } from '../recipe/entity/recipe.entity';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Rating, Recipe, User])],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
