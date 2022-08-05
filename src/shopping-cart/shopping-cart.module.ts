import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SHOPPINGCART } from 'src/common/models/models';
import { ShoppingCartSchema } from './schema/shopping-cart.schema';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { MenuModule } from '../menu/menu.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SHOPPINGCART.name,
        useFactory: () =>
          ShoppingCartSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    MenuModule,
    ProductModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
