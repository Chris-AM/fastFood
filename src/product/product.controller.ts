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
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly ingredientService: IngredientService,
  ) {}


}
