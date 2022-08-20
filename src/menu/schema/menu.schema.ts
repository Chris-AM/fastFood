import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProductsDocument } from 'src/product/schema/product.schema';
import { DrinksDocument } from '../../drinks/schema/drink.schema';

export type MenusDocument = Menus & Document;

@Schema({ timestamps: true })
export class Menus {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  description: string;
  @Prop({ default: null })
  photo: string;
  @Prop({ req: true, ref: 'Products' })
  products: ProductsDocument[];
  @Prop({ req: true, ref: 'Drinks' })
  drinks: DrinksDocument[];
}

export const MenuSchema = SchemaFactory.createForClass(Menus);

MenuSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});
