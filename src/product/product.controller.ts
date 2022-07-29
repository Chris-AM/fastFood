import { Body, Controller, Post } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() productDto: ProductDTO) {
    this.productService.createProduct(productDto);
  }
}
