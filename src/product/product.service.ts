import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entity/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { FileService } from '../file/file.service';
import { findRowHandler } from '../utils';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    private fileService: FileService,
  ) {}

  async create(dto: CreateProductDto) {
    const imagePath = this.fileService.createImageFromBase64(dto.img);

    const product = await this.productModel.create({ ...dto, img: imagePath });
    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const product = await findRowHandler(
      () => this.productModel.findByPk(updateProductDto.id),
      'Продукт',
    );

    let imagePath;
    if (updateProductDto.img) {
      imagePath = this.fileService.changeImageFromBase64(product.img, updateProductDto.img);
    }

    return product.update({ ...updateProductDto, img: imagePath });
  }

  async findAll() {
    return await this.productModel.findAll();
  }
}
