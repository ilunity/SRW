import { CreateCommentDto, ReadCommentDto } from './dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './entity/comment.entity';
import { User } from '../user/entity/user.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { WhereOptions } from 'sequelize';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.commentModel.create({ ...createCommentDto });
  }

  async findAll(additionalWhere?: WhereOptions): Promise<ReadCommentDto[]> {
    return await this.commentModel.findAll({
      where: { ...additionalWhere },
      include: [User, Recipe],
      attributes: { exclude: ['user_id', 'recipe_id'] },
    });
  }

  async findAllByUser(id: string): Promise<ReadCommentDto[]> {
    return await this.findAll({ user_id: id });
  }

  async findAllByRecipe(id: string): Promise<ReadCommentDto[]> {
    return await this.commentModel.findAll({
      where: { recipe_id: id },
      include: [User, Recipe],
      attributes: { exclude: ['user_id', 'recipe_id'] },
    });
  }

  async remove(id: string): Promise<void> {
    const comment = await this.commentModel.findByPk(id);
    return await comment.destroy();
  }
}
