import { Injectable } from '@nestjs/common';
import { CreateRatingDto, UpdateRatingDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './entity/rating.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { User } from '../user/entity/user.entity';
import { handleRowNotExist } from '../utils/row-existence-handlers';

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

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    await handleRowNotExist(this.recipeModel, { id: createRatingDto.recipe_id });
    await handleRowNotExist(this.userModel, { id: createRatingDto.user_id });

    return this.ratingModel.create({ ...createRatingDto });
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingModel.findAll();
  }

  async findAllByUser(id: number): Promise<Rating[]> {
    return this.ratingModel.findAll({ where: { user_id: id } });
  }

  async findAllByRecipe(id: number): Promise<Rating[]> {
    return this.ratingModel.findAll({ where: { recipe_id: id } });
  }

  async findOne(id: number): Promise<Rating> {
    return this.ratingModel.findByPk(id);
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    const rating = await this.ratingModel.findByPk(id);

    return await rating.update({ ...updateRatingDto });
  }

  async remove(id: number): Promise<void> {
    const rating = await this.ratingModel.findByPk(id);

    await rating.destroy();
  }
}
