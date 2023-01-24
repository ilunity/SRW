import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { USER_ROLE } from './user-roles';
import { Comment } from '../../comment/entity/comment.entity';
import { FavouriteRecipe } from '../../favourite-recipe/entity/favourite-recipe.entity';
import { Rating } from '../../rating/entity/rating.entity';

@Table({
  timestamps: false,
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false, defaultValue: USER_ROLE.USER })
  role: USER_ROLE;

  @Column
  avatar: string;

  @ApiHideProperty()
  @HasMany(() => Recipe)
  recipes: Recipe[];

  @ApiHideProperty()
  @HasMany(() => Comment)
  comments: Comment[];

  @ApiHideProperty()
  @HasMany(() => FavouriteRecipe)
  favourite_recipes: FavouriteRecipe[];

  @ApiHideProperty()
  @HasMany(() => Rating)
  recipe_scores: Rating[];
}
