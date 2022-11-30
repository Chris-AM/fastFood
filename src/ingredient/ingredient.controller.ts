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
  Put,
  CacheInterceptor,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientDTO } from './dto/ingredient.dto';
import { IngredientService } from './ingredient.service';
import { storage } from '../common/media.handler';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import { Response } from 'express';
import { of } from 'rxjs';
import { join } from 'path';

@ApiBearerAuth()
@ApiTags('ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @HttpCode(201)
@UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin'])
  createIngredient(@Body() ingredientDto: IngredientDTO) {
    return this.ingredientService.createIngredient(ingredientDto);
  }

  @Post('upload/:id')
  @HttpCode(201)
@UseGuards(JwtAgentGuard, RoleAgentGuard)

  @Role(['admin'])
  @UseInterceptors(FileInterceptor('photo', { storage }))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    return this.ingredientService.uploadImage(id, file.filename, response);
  }

  @Get()
  @HttpCode(200)
  @Role(['admin', 'user'])
  @UseInterceptors(CacheInterceptor)
  getAllIngredients() {
    return this.ingredientService.getAllIngredients();
  }

  @Get(':id')
  @HttpCode(200)
@UseGuards(JwtAgentGuard, RoleAgentGuard)

  @Role(['admin', 'user'])
  getIngredientById(@Param('id') id: string) {
    return this.ingredientService.getIngredientById(id);
  }

  @Get('image/:filename')
  @HttpCode(200)
  // @Role(['admin', 'user'])
  getIngredientImage(@Param('filename') filename: string, @Res() response: Response) {
    return of(response.sendFile(join(process.cwd(), './public/upload/' + filename)));
  }

  @Put(':id')
  @HttpCode(200)
@UseGuards(JwtAgentGuard, RoleAgentGuard)

  @Role(['admin'])
  updateIngredient(
    @Param('id') id: string,
    @Body() ingredientDto: IngredientDTO,
  ) {
    return this.ingredientService.updateIngredient(id, ingredientDto);
  }

  @Delete(':id')
  @HttpCode(200)
@UseGuards(JwtAgentGuard, RoleAgentGuard)

  @Role(['admin'])
  removeIngredient(@Param('id') id: string) {
    return this.ingredientService.removeIngredient(id);
  }
}
