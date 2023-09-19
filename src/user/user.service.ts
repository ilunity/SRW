import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { FileService } from '../file/file.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { findRowHandler } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(FavouriteRecipe)
    private favouriteRecipeModel: typeof FavouriteRecipe,
    private fileService: FileService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const imagePath = this.fileService.createImageFromBase64(dto.avatar);

    return this.userModel.create({ ...dto, avatar: imagePath });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async update(userId: number, updateDto: UpdateUserDto): Promise<User> {
    const user = await findRowHandler(() => this.userModel.findByPk(userId), 'Пользователь');

    let imagePath;
    if (updateDto.avatar) {
      imagePath = this.fileService.changeImageFromBase64(user.avatar, updateDto.avatar);
    }

    return await user.update({ ...updateDto, avatar: imagePath });
  }

  async updateRole(updateUserRoleDto: UpdateUserRoleDto): Promise<User> {
    const user = await findRowHandler(
      () => this.userModel.findByPk(updateUserRoleDto.id),
      'Пользователь',
    );

    return await user.update({ ...updateUserRoleDto });
  }
}
