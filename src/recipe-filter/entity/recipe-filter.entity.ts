import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { NestedFilter } from '../../nested-filter/entity/nested-filter.entity';

@Table({
  timestamps: false,
})
export class RecipeFilter extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => NestedFilter)
  @Column
  filter_id: number;

  @ApiHideProperty()
  @BelongsTo(() => NestedFilter)
  filter: NestedFilter;

  @ForeignKey(() => Recipe)
  @Column
  recipe_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
