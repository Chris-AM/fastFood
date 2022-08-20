import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredients, IngredientsDocument } from 'src/ingredient/schema/ingredient.schema';
import { ProductDTO } from './dto/product.dto';
import { Products, ProductsDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Products.name) 
    private readonly productsModel: Model<ProductsDocument>,
    @InjectModel(Ingredients.name)
    private readonly ingredientsModel: Model<IngredientsDocument>
  ) {}

  async createProduct(
    ingredientId: string[], 
    productDTO: ProductDTO
  ): Promise<ProductsDocument> {
    const ingredients = await this.ingredientsModel.find({ _id: { $in: ingredientId } });
    if(!ingredients) {
      throw new HttpException('One or more ingredients not found', HttpStatus.NOT_FOUND);
    }
    const product = new this.productsModel(productDTO);
    product.ingredients = ingredients;
    return await product.save();
  }

  async uploadPhoto(
    id: string, 
    fileName: string
  ): Promise<ProductsDocument> {
    return this.productsModel.findByIdAndUpdate(
      id,
      { photo: fileName },
      { new: true, upsert: true }
    );
  }

  async getAllProducts(): Promise<ProductsDocument[]> {
    return await this.productsModel.find();
  }
  
}
