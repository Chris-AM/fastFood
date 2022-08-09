import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from "mongoose";
import { MenusDocument } from "src/menu/schema/menu.schema";
import { ProductsDocument } from "src/product/schema/product.schema";
import { UsersDocument } from "src/user/schema/user.schema";

export type OrdersDocument = Orders & Document;

@Schema()
export class Orders {
  @Prop({ required: true, type: MongooseSchema.Types.Array })
  menus: MenusDocument[];
  @Prop({required: true, type: MongooseSchema.Types.Array})
  products: ProductsDocument[];
  @Prop({required: true, type: MongooseSchema.Types.Array})
  user: UsersDocument[];
  @Prop({required: true})
  total: number;
}

export const OrdersSchema =
  SchemaFactory.createForClass(Orders);
