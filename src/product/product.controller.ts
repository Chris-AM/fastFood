import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAgentGuard } from 'src/common/guards/jwt-agent.guard';
import { RoleAgentGuard } from 'src/common/guards/role-agent.guard';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../common/media.handler';
import { of } from 'rxjs';
import { Response } from 'express';
import { join } from 'path';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin'])
  createProduct(
    @Body() productDTO: ProductDTO,
    @Body('ingredients') ingredientId: string[],
  ) {
    return this.productService.createProduct(ingredientId, productDTO);
  }

  @Post('upload/:id')
  @HttpCode(201)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin'])
  @UseInterceptors(FileInterceptor('photo', { storage }))
  uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    this.productService.uploadPhoto(id, file.filename, response);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin', 'user'])
  @UseInterceptors(CacheInterceptor)
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin', 'user'])
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get('image/:filename')
  @HttpCode(200)
  // @Role(['admin', 'user'])
  getIngredientImage(
    @Param('filename') filename: string,
    @Res() response: Response,
  ) {
    return of(response.sendFile(join(process.cwd(), './public/upload/' + filename)));
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['admin'])
  updateProduct(
    @Param('id') id: string,
    @Body('ingredients') ingredientId: string[],
    @Body() productDTO: ProductDTO,
  ) {
    return this.productService.updateProduct(id, ingredientId, productDTO);
  }
}
