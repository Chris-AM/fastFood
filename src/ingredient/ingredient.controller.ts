import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientDTO } from './dto/ingredient.dto';
import { IngredientService } from './ingredient.service';
import { STORAGE } from '../common/media.handler';

@ApiBearerAuth()
@ApiTags('ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService
  ) {}

  @Post()
  createIngredient(
    @Body() ingredientDto: IngredientDTO
  ) {
    return this.ingredientService.createIngredient(ingredientDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('img', {storage: STORAGE}))
  uploadImage(@UploadedFile() file: Express.Multer.File){

  }
 
}
