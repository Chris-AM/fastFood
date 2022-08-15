import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly ingredientService: IngredientService,
  ) {}

  @Post()
  @HttpCode(201)
  @Role(['admin'])
  createProduct(
    @Body() productDTO: ProductDTO,
  ) {
    return this.productService.createProduct(productDTO);
  }

}
