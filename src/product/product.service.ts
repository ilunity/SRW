import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    private fileService: FileService,
  ) {}

  async create(dto: CreateProductDto, img: Express.Multer.File) {
    const imagePath = this.fileService.createFile(FileType.IMAGE, img);
    const product = await this.productModel.create({ ...dto, img: imagePath });
    return product;
  }
}
