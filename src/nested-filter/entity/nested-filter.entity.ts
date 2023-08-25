import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { RecipeFilter } from '../../recipe-filter/entity/recipe-filter.entity';

@Table({
  timestamps: false,
})
export class NestedFilter extends Model {
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

  @ForeignKey(() => NestedFilter)
  @Column({ allowNull: true })
  parent_id: number;

  @ApiHideProperty()
  @BelongsTo(() => NestedFilter)
  parent: NestedFilter;

  @ApiHideProperty()
  @HasMany(() => NestedFilter)
  children: NestedFilter[];

  @ApiHideProperty()
  @HasMany(() => RecipeFilter)
  recipes: RecipeFilter[];
}
