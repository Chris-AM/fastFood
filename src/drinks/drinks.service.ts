import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DrinksDto } from './dto/drinks.dto';
import { Drinks, DrinksDocument } from './schema/drink.schema';
import { Model } from 'mongoose';

@Injectable()
export class DrinksService {
  constructor(
    @InjectModel(Drinks.name)
    private readonly drinksModel: Model<DrinksDocument>,
  ) {}

  async createDrink(
    drinksDto: DrinksDto
  ): Promise<DrinksDocument> {
    return await this.drinksModel.create(drinksDto);
  }

  async uploadImage(
    id: string, 
    fileName: string
  ): Promise<DrinksDocument> {
    return await this.drinksModel.findByIdAndUpdate(
      id,
      { photo: fileName },
      { new: true, upsert: true },
    );
  }

  async findAllDrinks(): Promise<DrinksDocument[]> {
  return await this.drinksModel.find();
  }

  async findDrinkById(
    id: string
  ): Promise<DrinksDocument> {
    return await this.drinksModel.findById(id);
  }

  async updateDrink(
    id: string, 
    drinksDto: DrinksDto
  ): Promise<DrinksDocument> {
    return await this.drinksModel.findByIdAndUpdate(
      id, 
      drinksDto,
      { new: true, upsert: true },
    );
  }

  async deleteDrink(
    id: string
  ): Promise<DrinksDocument> {
    return await this.drinksModel.findByIdAndDelete(id);
  }
}
