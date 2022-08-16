import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IngredientType } from './ingredient.enum';

export type IngredientsDocument = Ingredients & Document;

@Schema({timestamps: true})
export class Ingredients {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true, enum: IngredientType })
  type: IngredientType;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  inStock: boolean;
  @Prop({ default: null })
  image: string;
}

export const IngredientSchema = 
  SchemaFactory.createForClass(Ingredients);

IngredientSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});