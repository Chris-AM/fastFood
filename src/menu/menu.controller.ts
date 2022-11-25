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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import { MenuDTO } from './dto/menu.dto';
import { MenuService } from './menu.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../common/media.handler';
import { Response } from 'express';
import { of } from 'rxjs';
import { join } from 'path';

@ApiBearerAuth()
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
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
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin'])
  @UseInterceptors(FileInterceptor('photo', { storage }))
  uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    this.menuService.uploadPhoto(id, file.filename, response);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin', 'user'])
  @UseInterceptors(CacheInterceptor)
  getAllMenus() {
    return this.menuService.getAllMenus();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin', 'user'])
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Get('image/:filename')
  @HttpCode(200)
  // @Role(['admin', 'user'])
  getMenutImage(
    @Param('filename') filename: string,
    @Res() response: Response,
  ) {
    return of(response.sendFile(join(process.cwd(), './public/' + filename)));
  }
  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
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
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin'])
  deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
