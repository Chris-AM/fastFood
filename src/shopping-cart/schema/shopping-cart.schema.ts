import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MenusDocument } from 'src/menu/schema/menu.schema';
import { ProductsDocument } from 'src/product/schema/product.schema';
import { UsersDocument } from 'src/user/schema/user.schema';
import { v4 as uuidv4 } from 'uuid';

export type OrdersDocument = Orders & Document;

@Schema({ timestamps: true })
export class Orders {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop({ required: true, type: MongooseSchema.Types.Array })
  menus: MenusDocument[];
  @Prop({ required: true, type: MongooseSchema.Types.Array })
  products: ProductsDocument[];
  @Prop({ required: true, type: MongooseSchema.Types.Array })
  orderer: UsersDocument[];
  @Prop({ required: true })
  total: number;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);

OrdersSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

