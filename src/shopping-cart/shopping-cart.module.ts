import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SHOPPINGCART } from 'src/common/models/models';
import { ShoppingCartSchema } from './schema/shopping-cart.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SHOPPINGCART.name,
        useFactory: () =>
          ShoppingCartSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
  ]
})
export class ShoppingCartModule {}
