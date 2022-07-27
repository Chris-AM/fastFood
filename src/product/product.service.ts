import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'src/common/interfaces/product.interface';
import { PRODUCT } from 'src/common/models/models';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(PRODUCT.name) private model: Model<IProduct>) {}

  async createProduct(productDto: ProductDTO): Promise<IProduct> {
    const newProduct = new this.model(productDto);
    return await newProduct.save();
  }
}
