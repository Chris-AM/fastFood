import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drinks } from 'src/drinks/schema/drink.schema';
import { Products, ProductsDocument } from 'src/product/schema/product.schema';
import { MenuDTO } from './dto/menu.dto';
import { Menus, MenusDocument } from './schema/menu.schema';
import { DrinksDocument } from '../drinks/schema/drink.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menus.name)
    private readonly menuModel: Model<MenusDocument>,
    @InjectModel(Products.name)
    private readonly productModel: Model<ProductsDocument>,
    @InjectModel(Drinks.name)
    private readonly drinksModel: Model<DrinksDocument>
  ) {}

  async createMenu(
    productId: string[],
    drinkId: string[],
    menuDto: MenuDTO
  ): Promise<MenusDocument> {
    const products = await this.productModel.find({ 
      _id: { $in: productId } 
    });
    const drinks = await this.drinksModel.find({
      _id: { $in: drinkId }
    });
    if(!products || !drinks) {
      throw new HttpException(
        'One or more products or drinks not found',
        HttpStatus.NOT_FOUND
      );
    }
    const menu = new this.menuModel(menuDto);
    menu.products = products;
    menu.drinks = drinks;
    return await menu.save();
  }

}
