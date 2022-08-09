import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuDTO } from './dto/menu.dto';
import { IMenu } from './interface/menu.interface';
import { Menus } from './schema/menu.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menus.name)
    private model: Model<IMenu>,
  ) {}

  async createMenu(menuDto: MenuDTO): Promise<IMenu> {
    const newMenu = new this.model(menuDto);
    return await newMenu.save();
  }

  async menuProducts(
    menuId: string, 
    productId: string
  ): Promise<IMenu> {
    const productsInMenu = await this.model
      .findByIdAndUpdate(
        menuId,
        {
          $addToSet: { products: productId },
        },
        { new: true },
      ).populate('products')
    return productsInMenu;
  }

  async getAllMenus(): Promise<IMenu[]> {
    return await this.model.find().populate('products');
  }

  async getMenuById(id: string): Promise<IMenu> {
    return await this.model.findById(id);
  }

  async updateMenu(
    id: string, 
    menuDto: MenuDTO
  ): Promise<IMenu> {
    return await this.model.
      findByIdAndUpdate(id, menuDto, { new: true });
  }

  async deleteMenu(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'deleted'
    }
  }
}
