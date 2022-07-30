import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('api/v1/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly ingredientService: IngredientService,
  ) {}

  @Post()
  createProduct(@Body() productDto: ProductDTO) {
    return this.productService.createProduct(productDto);
  }

  @Post(':productId/ingredient/:ingredientId')
  async productIngredients(
    @Param('productId') productId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    const ingredient = await this.ingredientService.getIngredientByID(
      ingredientId,
    );
    if (!ingredient)
      throw new HttpException(
        ' ingredient does not exisists ',
        HttpStatus.NOT_FOUND,
      );
    return this.productService.productIngredients(productId, ingredientId)
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() productDto: ProductDTO) {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
