import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IngredientsDocument } from '../../ingredient/schema/ingredient.schema';
import { v4 as uuidv4 } from 'uuid';

export type ProductsDocument = Products & Document;

@Schema({timestamps: true})
export class Products {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  photo: string;
  @Prop({ required: true, type: MongooseSchema.Types.Array })
  ingredients: IngredientsDocument[];
}

export const ProductSchema = 
  SchemaFactory.createForClass(Products);
