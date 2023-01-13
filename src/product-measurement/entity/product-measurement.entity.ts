import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty } from '@nestjs/swagger';
import { Product } from '../../product/entity/product.entity';

@Table({ timestamps: false })
export class ProductMeasurement extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ApiHideProperty()
  @BelongsTo(() => Product)
  product: Product;

  @Column({ allowNull: true })
  measurement_type: string;
}
