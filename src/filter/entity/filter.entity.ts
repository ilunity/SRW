import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { FilterType } from '../../filter-type/entity/filter-type.entity';

@Table({
  timestamps: false,
})
export class Filter extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  @ForeignKey(() => FilterType)
  @Column
  filter_type_id: number;

  @ApiHideProperty()
  @BelongsTo(() => FilterType)
  filterType: FilterType;
}
