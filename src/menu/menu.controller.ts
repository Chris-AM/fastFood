import {
  Body, 
  CacheInterceptor, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  Param, 
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import {MenuDTO} from './dto/menu.dto';
import {MenuService} from './menu.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../common/media.handler';

@ApiBearerAuth()
@ApiTags('menu')
@Controller('menu')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
  ) {}

  @Post()
  @HttpCode(201)
  @Role(['admin'])
  createMenu( 
    @Body() menuDto: MenuDTO,
    @Body('products') productId: string[],
    @Body('drinks') drinkId: string[],
  ) {
    return this.menuService.createMenu(productId, drinkId, menuDto);
  }

  @Post('upload/:id')
  @HttpCode(201)
  @Role(['admin'])
  @UseInterceptors(FileInterceptor('photo', { storage }))
  uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    this.menuService.uploadPhoto(id, file.filename);
  }

  @Get()
  @HttpCode(200)
  @Role(['admin', 'user'])
  @UseInterceptors(CacheInterceptor)
  getAllMenus() {
    return this.menuService.getAllMenus();
  }

  @Get(':id')
  @HttpCode(200)
  @Role(['admin', 'user'])
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Put(':id')
  @HttpCode(200)
  @Role(['admin'])
  updateMenu(
    @Param('id') id: string,
    @Body('products') productId: string[],
    @Body('drinks') drinkId: string[],
    @Body() menuDto: MenuDTO,
  ) {
    return this.menuService.updateMenu(id, productId, drinkId, menuDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Role(['admin'])
  deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
