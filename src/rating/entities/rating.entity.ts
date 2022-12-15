import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/entity/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipe/entity/recipe.entity';

@Table({
  timestamps: false,
})
export class Rating extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ validate: { min: 1, max: 5 }, allowNull: false })
  score: number;

  @ForeignKey(() => User)
  @Column({ unique: 'secondary_key' })
  user_id: number;

  @ApiHideProperty()
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Recipe)
  @Column({ unique: 'secondary_key' })
  recipe_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
