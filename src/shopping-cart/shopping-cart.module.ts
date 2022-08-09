import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { MenuModule } from '../menu/menu.module';
import { ProductModule } from '../product/product.module';
import { OrdersSchema, Orders } from './schema/shopping-cart.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Orders.name,
        useFactory: () =>
          OrdersSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    MenuModule,
    ProductModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
