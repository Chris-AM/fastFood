import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProductsDocument } from 'src/product/schema/product.schema';

export type MenusDocument = Menus & Document;

@Schema({timestamps: true})
export class Menus {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  photo: string;
  @Prop({ required: true, type: MongooseSchema.Types.Array })
  products: ProductsDocument[];
}

export const MenuSchema = 
  SchemaFactory.createForClass(Menus);
