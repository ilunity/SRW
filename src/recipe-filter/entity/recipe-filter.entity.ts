import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { Filter } from '../../filter/entity/filter.entity';

@Table({
  timestamps: false,
})
export class RecipeFilter extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Filter)
  @Column
  filter_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Filter)
  filter: Filter;

  @ForeignKey(() => Recipe)
  @Column
  recipe_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
