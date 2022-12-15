import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { SavedRecipe } from '../saved-recipe/saved-recipe.entity';
import { FavouriteRecipe } from '../favourite-recipe/favourite-recipe.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(SavedRecipe)
    private savedRecipeModel: typeof SavedRecipe,
    @InjectModel(FavouriteRecipe)
    private favouriteRecipeModel: typeof FavouriteRecipe,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...dto });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    return await user.update({ ...updateDto });
  }
}
