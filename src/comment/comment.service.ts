import { CreateCommentDto, ReadCommentDto, ReadRecipeCommentDto, ReadUserCommentDto } from './dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './entity/comment.entity';
import { User } from '../user/entity/user.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { WhereOptions } from 'sequelize';
import { IUserPayload } from '../auth/jwt-strategies';
import { isAllowedRole } from '../utils';
import { USER_ROLE } from '../user/entity/user-roles';

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

  async findAllByUser(id: number): Promise<ReadUserCommentDto[]> {
    return await this.commentModel.findAll({
      where: { user_id: id },
      include: [Recipe],
      attributes: { exclude: ['user_id', 'recipe_id'] },
    });
  }

  async findAllByRecipe(id: number): Promise<ReadRecipeCommentDto[]> {
    return await this.commentModel.findAll({
      where: { recipe_id: id },
      include: [User],
      attributes: { exclude: ['user_id', 'recipe_id'] },
    });
  }

  async remove(user: IUserPayload, id: number): Promise<void> {
    const comment = await this.commentModel.findByPk(id);
    if (!isAllowedRole(user.role, [USER_ROLE.ADMIN]) && user.id !== comment.user_id) {
      throw new ForbiddenException('Недостаточно полномочий');
    }

    return await comment.destroy();
  }
}
