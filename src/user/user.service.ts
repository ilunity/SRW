import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { FileService, FileType } from '../file/file.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(FavouriteRecipe)
    private favouriteRecipeModel: typeof FavouriteRecipe,
    private fileService: FileService,
  ) {}

  async create(dto: CreateUserDto, avatar: Express.Multer.File): Promise<User> {
    const imagePath = this.fileService.createFile(FileType.IMAGE, avatar);

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

  async update(updateDto: UpdateUserDto, avatar?: Express.Multer.File): Promise<User> {
    const user = await this.userModel.findByPk(updateDto.id);

    let imagePath;
    if (avatar) {
      imagePath = this.fileService.createFile(FileType.IMAGE, avatar);
    }

    return await user.update({ ...updateDto, avatar: imagePath });
  }

  async updateRole(updateUserRoleDto: UpdateUserRoleDto): Promise<User> {
    const user = await this.userModel.findByPk(updateUserRoleDto.id);

    return await user.update({ ...updateUserRoleDto });
  }
}
