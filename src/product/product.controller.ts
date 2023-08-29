import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entity/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userRoleErrorHandler } from '../utils';
import { USER_ROLE } from '../user/entity/user-roles';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /** Creates the Product record */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto): Promise<Product> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);
    return this.productService.create(createProductDto);
  }

  /** Returns the list of products */
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  /** Updates the Product record */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Request() req, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);
    return this.productService.update(updateProductDto);
  }
}
