import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredients, IngredientsDocument } from 'src/ingredient/schema/ingredient.schema';
import { ProductDTO } from './dto/product.dto';
import { Products, ProductsDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Products.name) 
    private productsModel: Model<ProductsDocument>,
    @InjectModel(Ingredients.name)
    private readonly ingredientsModel: Model<IngredientsDocument>
  ) {}

  
}
