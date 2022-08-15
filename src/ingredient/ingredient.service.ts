import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IngredientDTO } from './dto/ingredient.dto';
import { Ingredients, IngredientsDocument } from './schema/ingredient.schema';


@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredients.name)
    private readonly ingredientsModel: Model<IngredientsDocument>,
  ) {}

  async createIngredient(ingredientDto: IngredientDTO) {
    try {
      return this.ingredientsModel.create(ingredientDto);
    } catch (error) {
      console.log(error)
    }
  }
  
  async getAllIngredints() {
    return await this.ingredientsModel.find();
  }

  async removeIngredient(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.ingredientsModel.deleteOne({ _id });
    return response;
  }

}
