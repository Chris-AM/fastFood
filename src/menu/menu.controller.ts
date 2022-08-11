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
  UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import {ProductService} from 'src/product/product.service';
import {MenuDTO} from './dto/menu.dto';
import {MenuService} from './menu.service';

@UseGuards(JwtAgentGuard)
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
