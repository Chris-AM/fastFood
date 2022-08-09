import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from 'src/product/schema/product.schema';
import { MenuDTO } from './dto/menu.dto';
import { Menus, MenusDocument } from './schema/menu.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menus.name)
    private readonly menuModel: Model<MenusDocument>,
    @InjectModel(Products.name)
    private readonly productModel: Model<ProductsDocument>
  ) {}

  async createMenu(menuDto: MenuDTO) {
    const newMenu = new this.menuModel(menuDto);
    return await newMenu.save();
  }

}
