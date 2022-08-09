import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientsDocument = Ingredients & Document;

@Schema()
export class Ingredients {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  inStock: boolean;
  @Prop({ required: true })
  image: string;
}

export const IngredientSchema = 
  SchemaFactory.createForClass(Ingredients);
