import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { RecipeCategory } from '../../recipe-category/entity/recipe-category.entity';
import { Recipe } from '../../recipe/entity/recipe.entity';

@Table({
  timestamps: false,
})
export class NestedCategory extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, defaultValue: 0 })
  left_key: number;

  @Column({ allowNull: false, defaultValue: 0 })
  right_key: number;

  @Column({ allowNull: false })
  level: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  @ForeignKey(() => NestedCategory)
  @Column({ allowNull: true })
  parent_id: number;

  @ApiHideProperty()
  @BelongsTo(() => NestedCategory)
  parent: NestedCategory;

  @ApiHideProperty()
  @HasMany(() => NestedCategory)
  children: NestedCategory[];

  @ApiHideProperty()
  @BelongsToMany(() => Recipe, () => RecipeCategory)
  recipes: Recipe[];
}
