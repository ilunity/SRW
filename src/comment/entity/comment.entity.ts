import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import { User } from '../../user/entity/user.entity';
import { Recipe } from '../../recipe/entity/recipe.entity';

@Table({
  timestamps: false,
})
export class Comment extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  text: string;

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
