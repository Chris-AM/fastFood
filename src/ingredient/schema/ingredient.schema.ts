import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type IngredientsDocument = Ingredients & Document;

@Schema({timestamps: true})
export class Ingredients {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  inStock: boolean;
  @Prop()
  image: string;
}

export const IngredientSchema = 
  SchemaFactory.createForClass(Ingredients);
