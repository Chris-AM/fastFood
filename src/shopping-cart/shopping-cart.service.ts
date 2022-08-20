import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCartDTO } from './dto/shopping-cart.dto';
import { Orders, OrdersDocument } from './schema/shopping-cart.schema';
import { Menus } from '../menu/schema/menu.schema';
import { Products } from '../product/schema/product.schema';
import { Drinks } from '../drinks/schema/drink.schema';

interface ModelExt<T> extends Model<T> {
  getAllOrders: Function;
}
@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(Orders.name)
    private ordersModel: ModelExt<Orders>,
    @InjectModel(Menus.name)
    private menusModel: Model<Menus>,
    @InjectModel(Products.name)
    private productsModel: Model<Products>,
    @InjectModel(Drinks.name)
    private drinksModel: Model<Drinks>,
  ) {}

  async createOrder(
    menuId: string[],
    productId: string[],
    drinkId: string[],
    shoppingCartDTO: ShoppingCartDTO,
  ): Promise<OrdersDocument> {
    const menus = await this.menusModel.find({
      _id: { $in: menuId },
    });
    const products = await this.productsModel.find({
      _id: { $in: productId },
    });
    const drinks = await this.drinksModel.find({
      _id: { $in: drinkId },
    });
    if (!menus || !products || !drinks) {
      throw new HttpException(
        'One or more products or drinks or menus not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const order = new this.ordersModel(shoppingCartDTO);
    order.menus = menus;
    order.products = products;
    order.drinks = drinks;
    return await order.save();
  }

  async getAllOrders(): Promise<OrdersDocument[]> {
    return this.ordersModel.getAllOrders();
  }

  async getOrderById(
    id: string
  ): Promise<OrdersDocument> {
    return await this.ordersModel.findById(id);
  }

  
}
