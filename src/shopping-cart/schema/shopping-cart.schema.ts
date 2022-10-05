import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MenusDocument } from 'src/menu/schema/menu.schema';
import { ProductsDocument } from 'src/product/schema/product.schema';
import { UsersDocument } from 'src/user/schema/user.schema';
import { DrinksDocument } from '../../drinks/schema/drink.schema';
export type OrdersDocument = Orders & Document;

@Schema({ timestamps: true })
export class Orders {
  @Prop({ required: true, ref: 'menus' })
  menus: MenusDocument[];
  @Prop({ required: true, ref: 'products' })
  products: ProductsDocument[];
  @Prop({ required: true, ref: 'drinks' })
  drinks: DrinksDocument[];
  @Prop({ required: true, ref: 'user' })
  orderer: string;
  @Prop({ required: true })
  total: number;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);

OrdersSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

OrdersSchema.statics.getAllOrders = async function () {
  const listOrders = this.aggregate([
    {
      $lookup: {
        from: 'users',
        foreignField: 'id',
        localField: 'orderer',
        as: 'ordered by',
        pipeline: [
          {
            $project: {
              _id: 0,
              name: 1,
              phoneNumber: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: '$ordered by',
    },
  ]);
  return listOrders;
}