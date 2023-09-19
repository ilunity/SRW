import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { NestedCategory } from '../../nested-category/entity/nested-category.entity';
import { Recipe } from '../../recipe/entity/recipe.entity';

@Table({
  timestamps: false,
})
export class RecipeCategory extends Model {
  @ForeignKey(() => NestedCategory)
  @Column
  category_id: number;

  @ForeignKey(() => Recipe)
  @Column
  recipe_id: number;
}
