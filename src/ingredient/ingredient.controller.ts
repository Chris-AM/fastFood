import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  HttpCode,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientDTO } from './dto/ingredient.dto';
import { IngredientService } from './ingredient.service';
import { storage } from '../common/media.handler';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';

@ApiBearerAuth()
@ApiTags('ingredient')
@Controller('ingredient')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService
  ) {}

  @Post()
  @HttpCode(201)
  @Role(['admin'])
  createIngredient(
    @Body() ingredientDto: IngredientDTO
  ) {
    return this.ingredientService.createIngredient(ingredientDto);
  }

  @Post('upload/:id')
  @HttpCode(201)
  @Role(['admin'])
  @UseInterceptors(FileInterceptor('img', { storage }))
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    console.log(id, file.filename)
    this.ingredientService.uploadImage(id, file.filename);
  }

  @Get()
  @HttpCode(200)
  @Role(['admin', 'user'])
  getAllIngredients() {
    return this.ingredientService.getAllIngredients();
  }

  @Get(':id')
  @HttpCode(200)
  @Role(['admin' , 'user'])
  getIngredientById(@Param('id') id: string) {
    return this.ingredientService.getIngredientById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Role(['admin'])
  updateIngredient(@Param('id') id: string, @Body() ingredientDto: IngredientDTO) {
    return this.ingredientService.updateIngredient(id, ingredientDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Role(['admin'])
  removeIngredient(@Param('id') id: string) {
    return this.ingredientService.removeIngredient(id);
  }
}
