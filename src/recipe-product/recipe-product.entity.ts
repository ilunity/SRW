import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Recipe } from '../recipe/entity/recipe.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Product } from '../product/product.entity';

@Table({
  timestamps: false,
})
export class RecipeProduct extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  weight: number;

  @ApiHideProperty()
  @ForeignKey(() => Recipe)
  @Column
  recipe_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;
}
