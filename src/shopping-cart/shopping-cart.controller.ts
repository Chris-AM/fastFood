import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { MenuService } from 'src/menu/menu.service';
import { ProductService } from 'src/product/product.service';
import { ShoppingCartDTO } from './dto/shopping-cart.dto';
import { ShoppingCartService } from './shopping-cart.service';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly menuService: MenuService,
    private readonly productService: ProductService,
  ) {}


}
