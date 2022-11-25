import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
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
      console.log(error);
    }
  }

  async uploadImage(
    id: string,
    fileName: string,
    response: Response,
  ): Promise<IngredientsDocument> {
    try {
      const ingredientDB = await this.ingredientsModel.findById(id);
      if (!ingredientDB) {
        response.status(404).json({
          ok: false,
          message: 'Ingrediente no encontrada',
        });
      }
      return await this.ingredientsModel.findByIdAndUpdate(
        id,
        { image: fileName },
        { new: true, upsert: true },
      );
    } catch (error) {
      error;
    }
  }

  async getAllIngredients(): Promise<IngredientsDocument[]> {
    return await this.ingredientsModel.find();
  }

  async getIngredientById(id: string): Promise<IngredientsDocument> {
    return await this.ingredientsModel.findOne({ id });
  }

  async getIngredientImage(id: string, response: Response) {
    console.log('🚀 debug in service');
    try {
      const ingredientDB = await this.ingredientsModel.findById(id);
      if (!ingredientDB) {
        response.status(404).json({
          ok: false,
          message: 'Ingrediente no encontrado',
        });
      }
      const file = ingredientDB.image;
      // return of(response.sendFile(join(process.cwd(), './public/' + file)));
    } catch (error) {
      response.status(500).json({
        ok: false,
        error,
      });
    }
  }

  async updateIngredient(
    id: string,
    ingredientDto: IngredientDTO,
  ): Promise<IngredientsDocument> {
    const response = this.ingredientsModel.findByIdAndUpdate(
      id,
      ingredientDto,
      { new: true, upsert: true },
    );
    return response;
  }

  async removeIngredient(id: string): Promise<IngredientsDocument> {
    const response = this.ingredientsModel.findByIdAndDelete(id);
    return response;
  }
}
