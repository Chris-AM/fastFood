import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientDTO } from './dto/ingredient.dto';
import { IngredientService } from './ingredient.service';
import { STORAGE } from '../common/media.handler';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';

@ApiBearerAuth()
@ApiTags('ingredient')
@Controller('ingredient')
@UseGuards(JwtAgentGuard)
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService
  ) {}

  @Post()
  //@Role(['admin'])
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
