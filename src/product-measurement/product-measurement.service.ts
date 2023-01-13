import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductMeasurement } from './entity/product-measurement.entity';
import { CreateProductMeasurementDto } from './dto';

@Injectable()
export class ProductMeasurementService {
  constructor(
    @InjectModel(ProductMeasurement)
    private productMeasurementModel: typeof ProductMeasurement,
  ) {}

  async create(
    createProductMeasurementDto: CreateProductMeasurementDto,
  ): Promise<ProductMeasurement> {
    return this.productMeasurementModel.create({ ...createProductMeasurementDto });
  }

  async remove(id: string): Promise<void> {
    const productMeasurement = await this.productMeasurementModel.findByPk(id);
    return await productMeasurement.destroy();
  }
}
