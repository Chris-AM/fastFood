import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IngredientDTO } from './dto/ingredient.dto';
import { Ingredients, IngredientsDocument } from './schema/ingredient.schema';
import { Express } from "express";

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

  async uploadImage(
    id: string, 
    fileName: string
  ): Promise<IngredientsDocument> {
    try {
    return this.ingredientsModel.findByIdAndUpdate(
      id,
      { image: fileName },
      { new: true, upsert: true }
    );
    } catch (error) {
      error
      console.log(error)      
    }
  }
  
  async getAllIngredients(): Promise<IngredientsDocument[]> {
    return await this.ingredientsModel.find();
  }

  async getIngredientById(
    id: string
  ): Promise<IngredientsDocument> {
    return await this.ingredientsModel.findOne({ id });
  }

  async updateIngredient(
    id: string, 
    ingredientDto: IngredientDTO
  ): Promise<IngredientsDocument> {
    const response = this.ingredientsModel.findByIdAndUpdate(
      id,
      ingredientDto,
      { new: true, upsert: true }
    );
    return response;
  }

  async removeIngredient(
    id: string
  ): Promise<IngredientsDocument> {
    const response = this.ingredientsModel.findByIdAndDelete(id);
    return response;
  }

}
