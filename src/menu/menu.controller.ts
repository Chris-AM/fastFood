import {
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpException, 
  HttpStatus, 
  Param, 
  Post,
  Put
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {ProductService} from 'src/product/product.service';
import {MenuDTO} from './dto/menu.dto';
import {MenuService} from './menu.service';

@ApiBearerAuth()
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly productService: ProductService
  ) {}

  @Post()
  createMenu( @Body() menuDto: MenuDTO ){
    return this.menuService.createMenu(menuDto);
  }

}
