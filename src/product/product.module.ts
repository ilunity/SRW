import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { FileService } from '../file/file.service';
import { ProductController } from './product.controller';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, FileService],
})
export class ProductModule {}
