import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drinks } from 'src/drinks/schema/drink.schema';
import { Products, ProductsDocument } from 'src/product/schema/product.schema';
import { MenuDTO } from './dto/menu.dto';
import { Menus, MenusDocument } from './schema/menu.schema';
import { DrinksDocument } from '../drinks/schema/drink.schema';
import { Response } from 'express';

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

  async uploadPhoto(
    menuId: string,
    fileName: string,
    response: Response
  ): Promise<MenusDocument> {
    try {
      const ingredientDB = await this.menuModel.findById(menuId);
      if (!ingredientDB) {
        response.status(404).json({
          ok: false,
          message: 'Ingrediente no encontrada',
        });
      }
      return await this.menuModel.findByIdAndUpdate(
        menuId,
        { photo: fileName },
        { new: true, upsert: true },
      );
    } catch (error) {
      error;
    }
  }

  async getAllMenus(): Promise<MenusDocument[]> {
    return await this.menuModel.find();
  }

  async getMenuById(
    id: string
  ): Promise<MenusDocument> {
    try {
      return await this.menuModel.findById(id);
    } catch (error) {
      throw new HttpException("Menu not found", HttpStatus.NOT_FOUND);
    }
  }

  async updateMenu(
    id: string,
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
    return await this.menuModel.findByIdAndUpdate(
      id,
      { ...menuDto, products, drinks },
      { new: true, upsert: true }
    );
  }

  async deleteMenu(
    id: string
  ): Promise<MenusDocument> {
    return await this.menuModel.findByIdAndDelete(id);
  }
}
