import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IIngredient } from 'src/common/interfaces/ingredient.interface';
import { INGREDIENT } from 'src/common/models/models';
import { IngredientDTO } from './dto/ingrefient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(INGREDIENT.name)
    private readonly model: Model<IIngredient>,
  ) {}

  async createIngredient(ingredientDto: IngredientDTO): Promise<IIngredient> {
    const newIngredient = new this.model(ingredientDto);
    return await newIngredient.save();
  }

  async getAllIngredints(): Promise<IIngredient[]> {
    return await this.model.find();
  }

  async getIngredientByID(id: string): Promise<IIngredient> {
    return await this.model.findById(id);
  }

  async updateIngredient(
    id: string,
    ingredientDto: IngredientDTO,
  ): Promise<IIngredient> {
    return await this.model.findByIdAndUpdate(id, ingredientDto, { new: true });
  }

  async deleteIngredient(id: string): Promise<IIngredient> {
    return await this.model.findByIdAndDelete(id);
  }
}
