import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { Filter } from '../../filter/entity/filter.entity';

@Table({
  timestamps: false,
})
export class FilterType extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  @ApiHideProperty()
  @HasMany(() => Filter)
  filters: Filter[];
}
