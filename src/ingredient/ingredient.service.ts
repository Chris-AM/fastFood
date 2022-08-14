import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IngredientDTO } from './dto/ingredient.dto';
import { Ingredients, IngredientsDocument } from './schema/ingredient.schema';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredients.name)
    private readonly model: Model<IngredientsDocument>,
  ) {}

  async createIngredient(ingredientDto: IngredientDTO) {
    try {
      return this.model.create(ingredientDto);
    } catch (error) {
      console.log(error)
    }
  }

  async getAllIngredints() {
    return await this.model.find();
  }
 
}
