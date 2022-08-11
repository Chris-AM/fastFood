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
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientDTO } from './dto/ingredient.dto';
import { IngredientService } from './ingredient.service';
import { STORAGE } from '../common/media.handler';
import { Request } from 'express';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import { Role } from 'src/common/decorators/role.decorator';

@ApiBearerAuth()
@ApiTags('ingredient')
@Controller('ingredient')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService
  ) {}

  @Post()
  @Role(['admin'])
  createIngredient(
    @Req() req: Request,
    @Body() ingredientDto: IngredientDTO
  ) {
    return this.ingredientService.createIngredient(ingredientDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('img', {storage: STORAGE}))
  uploadImage(@UploadedFile() file: Express.Multer.File){

  }

}
