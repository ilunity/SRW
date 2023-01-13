import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { RecipeProduct } from '../../recipe-product/entity/recipe-product.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Table({
  timestamps: false,
})
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  @Column({ allowNull: false })
  img: string;

  @ApiHideProperty()
  @HasMany(() => RecipeProduct)
  recipes: RecipeProduct[];
}
