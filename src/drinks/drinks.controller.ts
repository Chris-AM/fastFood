import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import { DrinksService } from './drinks.service';
import { DrinksDto } from './dto/drinks.dto';
import { storage } from '../common/media.handler';

@ApiBearerAuth()
@ApiTags('drinks')
@Controller('drink')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class DrinksController {
  constructor(
    private readonly drinksService: DrinksService
  ) {}

  @Post()
  @HttpCode(201)
  @Role([ 'admin' ])
  createDrink(@Body() drinksDto: DrinksDto) {
    return this.drinksService.createDrink(drinksDto);
  }

  @Post('upload/:id')
  @HttpCode(201)
  @Role([ 'admin' ])
  @UseInterceptors(FileInterceptor('img', { storage }))
  uploadImage(
    @Param('id') id: string, 
    @UploadedFile() file: Express.Multer.File
  ) {
    this.drinksService.uploadImage(id, file.filename);
  }


  @Get()
  @HttpCode(200)
  @Role([ 'admin', 'user' ])
  findAll() {
    return this.drinksService.findAllDrinks();
  }

  @Get(':id')
  @HttpCode(200)
  @Role([ 'admin', 'user' ])
  findOne(@Param('id') id: string) {
    return this.drinksService.findDrinkById(id);
  }

  @Put(':id')
  @HttpCode(200)
  @Role([ 'admin' ])
  update(@Param('id') id: string, @Body() drinksDto: DrinksDto) {
    return this.drinksService.updateDrink(id, drinksDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Role([ 'admin' ])
  remove(@Param('id') id: string) {
    return this.drinksService.deleteDrink(id);
  }
}
