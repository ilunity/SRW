import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateProductDto } from './dto';
import { Product } from './entity/product.entity';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /** Creates the Product record */
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  create(
    @Body() productDto: CreateProductDto,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<Product> {
    return this.productService.create(productDto, img);
  }

  /** Returns the list of products */
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
