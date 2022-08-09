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

  @Post(':menuId/product/:productId')
  async productsInMenu(
    @Param('menuId') menuId: string,
    @Param('productId') productId: string,
  ) {
    const product = await this.productService.getProductById(
      productId
    );
    if(!product){
      throw new HttpException(
        'product not found or does not exisists',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.menuService.menuProducts(menuId, productId)
  }

  @Get()
  getAllMenus(){
    try {
      return this.menuService.getAllMenus();
    } catch (error) {
      console.log('error ==>', error);
      return {
        ok: false,
        error
      }
    }
  }

  @Get(':id')
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Put(':id')
  updateMenu(
    @Param('id') id: string,
    @Body() menuDto: MenuDTO,
  ) {
    return this.menuService.updateMenu(id, menuDto);
  }

  @Delete(':id')
  deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }

}
