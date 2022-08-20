import {
  Body, 
  Controller, 
  HttpCode, 
  Post,
  UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import {MenuDTO} from './dto/menu.dto';
import {MenuService} from './menu.service';

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

}
