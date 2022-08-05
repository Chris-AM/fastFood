import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SHOPPINGCART } from 'src/common/models/models';
import { ShoppingCartDTO } from './dto/shopping-cart.dto';
import { IShoppingCart } from './interface/shopping-cart.interface';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(SHOPPINGCART.name)
    private model: Model<IShoppingCart>
  ){}

  async postMenuToOrder(
    orderId: string,
    menuId: string
  ): Promise<IShoppingCart> {
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
    productId: string,
  ): Promise<IShoppingCart> {
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
  ): Promise <IShoppingCart> {
    const newOrder = new this.model(shoppingCartDto);
    return await newOrder.save();
  }
  
  async getAllOrders(): Promise<IShoppingCart[]> {
    return await this.model.find().populate('menus').populate('products');
  }

  async getOrderById(id: string): Promise<IShoppingCart> {
    return await this.model.findById(id);
  }
}
