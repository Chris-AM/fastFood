import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../common/media.handler';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  @HttpCode(201)
  @Role(['admin'])
  createProduct(
    @Body() productDTO: ProductDTO,
    @Body('ingredients') ingredientId: string[],
  ) {
    return this.productService.createProduct(ingredientId, productDTO);
  }

  @Post('upload/:id')
  @HttpCode(201)
  @Role(['admin'])
  @UseInterceptors(FileInterceptor('photo', { storage }))
  uploadPhoto(
    @Param('id') id: string, 
    @UploadedFile() file: Express.Multer.File
  ) {
    this.productService.uploadPhoto(id, file.filename);
  }

  @Get()
  @HttpCode(200)
  @Role(['admin', 'user'])
  getAllProducts() {
    return this.productService.getAllProducts();
  }
}
