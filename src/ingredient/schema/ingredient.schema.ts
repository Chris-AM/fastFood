import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IngredientType } from './ingredient.enum';

export type IngredientsDocument = Ingredients & Document;

@Schema({timestamps: true})
export class Ingredients {
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
  const { __v, ...object } = this.toObject();
  return object;
});

IngredientSchema.index({ name: 1 });