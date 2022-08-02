import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './interface/product.interface';
import { PRODUCT } from 'src/common/models/models';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT.name) 
    private model: Model<IProduct>
  ) {}

  async createProduct(productDto: ProductDTO): Promise<IProduct> {
    const newProduct = new this.model(productDto);
    return await newProduct.save();
  }

  async productIngredients(
    productId: string,
    ingredientId: string,
  ): Promise<IProduct> {
    const ingredientsInProduct = await this.model
      .findByIdAndUpdate(
        productId,
        {
          $addToSet: { ingredients: ingredientId },
        },
        { new: true },
      )
      .populate('ingredients');
    return ingredientsInProduct;
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await this.model.find().populate('ingredients');
  }

  async getProductById(id: string): Promise<IProduct> {
    return await this.model.findById(id);
  }

  async updateProduct(
    id: string, 
    productDto: ProductDTO
  ): Promise<IProduct> {
    return await this.model.
      findByIdAndUpdate(id, productDto, { new: true });
  }

  async deleteProduct(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'deleted',
    };
  }
}
