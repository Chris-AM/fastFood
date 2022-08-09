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

  @Post()
  createOrder(
    @Body()
    shoppingCartDto: ShoppingCartDTO,
  ) {
    return this.shoppingCartService.createOrder(shoppingCartDto);
  }

  @Post(':orderId/menu/:menuId')
  async postMenuToOrder(
    @Param('orderId') orderId: string,
    @Param('menuId') menuId: string,
  ) {
    const menu = await this.menuService.getMenuById(menuId);
    if (!menu) {
      throw new HttpException(
        'menu does found or does not exisists',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.shoppingCartService.postMenuToOrder(orderId, menuId);
  }

  @Post(':orderId/product/:productId')
  async postProductToOrder(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    const product = 
      await this.productService.getProductById(productId);
    if (!product) {
      throw new HttpException(
        'product not found or does not exisists',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.shoppingCartService.postProductToOrder(orderId, productId);
  }

  @Get()
  getAllOrders() {
    try {
      return this.shoppingCartService.getAllOrders();
    } catch (error) {
      console.log('error ===> ', error);
      return {
        ok: false,
        error,
      };
    }
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.shoppingCartService.getOrderById(id);
  }
}
