import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { User } from '../../user/entity/user.entity';

@Table({
  timestamps: false,
})
export class FavouriteRecipe extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ApiHideProperty()
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Recipe)
  @Column
  recipe_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
