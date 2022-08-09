import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { IngredientDTO } from './dto/ingrefient.dto';
import { IngredientService } from './ingredient.service';

@ApiBearerAuth()
@ApiTags('ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  createIngredient(@Body() ingredientDto: IngredientDTO) {
    return this.ingredientService.createIngredient(ingredientDto);
  }

  @Get()
  getAllIngredints() {
    return this.ingredientService.getAllIngredints();
  }

  @Get(':id')
  getIngredientByID(@Param('id') id: string) {
    return this.ingredientService.getIngredientByID(id);
  }

  @Put(':id')
  updateIngredient(
    @Param('id') id: string,
    @Body() ingredientDto: IngredientDTO,
  ) {
    return this.ingredientService.updateIngredient(id, ingredientDto);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.deleteIngredient(id);
  }
}
