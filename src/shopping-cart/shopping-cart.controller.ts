import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { ShoppingCartService } from './shopping-cart.service';
import { RoleAgentGuard } from '../common/guards/role-agent.guard';
import { JwtAgentGuard } from '../common/guards/jwt-agent.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { ShoppingCartDTO } from './dto/shopping-cart.dto';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService
  ) {}

  @Post()
  @HttpCode(201)
  @Role(['admin', 'user'])
  async createOrder(
    @Body('menus') menuId: string[],
    @Body('products') productId: string[],
    @Body('drinks') drinkId: string[],
    @Body() order: ShoppingCartDTO
  ) {
    return this.shoppingCartService.createOrder(menuId, productId, drinkId, order);
  }

  @Get()
  @HttpCode(200)
  @Role(['admin'])
  @UseInterceptors(CacheInterceptor)
  async getAllOrders() {
    return this.shoppingCartService.getAllOrders();
  }

}
