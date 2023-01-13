import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /** Creates the Product record */
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() productDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product> {
    return this.productService.create(productDto, file);
  }
}
