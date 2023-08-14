import { Injectable } from '@nestjs/common';
import { RatingDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './entity/rating.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { User } from '../user/entity/user.entity';
import { handleRowNotExist } from '../utils/row-existence-handlers';
import { GetRatingDto } from './dto/get-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating)
    private ratingModel: typeof Rating,
    @InjectModel(Recipe)
    private recipeModel: typeof Recipe,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(ratingDto: RatingDto): Promise<Rating> {
    await handleRowNotExist(this.recipeModel, { id: ratingDto.recipe_id });
    await handleRowNotExist(this.userModel, { id: ratingDto.user_id });

    return this.ratingModel.create({ ...ratingDto });
  }

  async findOne(getRatingDto: GetRatingDto): Promise<Rating | undefined> {
    return this.ratingModel.findOne({ where: { ...getRatingDto } });
  }

  async update({ user_id, recipe_id, score }: RatingDto): Promise<Rating> {
    const rating = await this.ratingModel.findOne({
      where: {
        user_id,
        recipe_id,
      },
    });

    return await rating.update({ score });
  }

  async remove(getRatingDto: GetRatingDto): Promise<void> {
    const rating = await this.ratingModel.findOne({ where: { ...getRatingDto } });

    await rating.destroy();
  }
}
