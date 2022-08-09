import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCartDTO } from './dto/shopping-cart.dto';
import { Orders } from './schema/shopping-cart.schema';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(Orders.name)
    private model: Model<Orders>
  ){}

  async postMenuToOrder(
    orderId: string,
    menuId: any
  ) {
    const menusInOrder = await this.model
    .findByIdAndUpdate(
      orderId,
      {
        $addToSet: { menus: menuId },
      },
      { new: true },
    ).populate('menus')
    return menusInOrder;
  }

  async postProductToOrder(
    orderId: string,
    productId: any,
  ) {
    const productsInOrder = await this.model
    .findByIdAndUpdate(
      orderId,
      {
        $addToSet: { products: productId },
      },
      {
        new: true
      }
    ).populate('products');
    return productsInOrder;
  }

  async createOrder(
    shoppingCartDto: ShoppingCartDTO
  ) {
    const newOrder = new this.model(shoppingCartDto);
    return await newOrder.save();
  }
  
  async getAllOrders() {
    return await this.model.find().populate('menus').populate('products');
  }

  async getOrderById(id: string) {
    return await this.model.findById(id);
  }
}
