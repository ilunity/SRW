import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipe/entity/recipe.entity';

@Table({})
export class RecipeStep extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Recipe)
  @Column
  recipe_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @Column({ allowNull: true, defaultValue: null })
  img: string;

  @Column({ allowNull: false })
  content: string;
}
