import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { MenuModule } from '../menu/menu.module';
import { ProductModule } from '../product/product.module';
import { OrdersSchema, Orders } from './schema/shopping-cart.schema';
import { DrinksModule } from 'src/drinks/drinks.module';
import { Products, ProductSchema } from '../product/schema/product.schema';
import { Drinks, DrinksSchema } from '../drinks/schema/drink.schema';
import { Menus } from 'src/menu/schema/menu.schema';
import { MenuSchema } from '../menu/schema/menu.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Orders.name,
        useFactory: () =>
          OrdersSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    MongooseModule.forFeature([
      { name: Orders.name, schema: OrdersSchema },
      { name: Menus.name, schema: MenuSchema },
      { name: Products.name, schema: ProductSchema },
      { name: Drinks.name, schema: DrinksSchema },
    ]),
    MenuModule,
    ProductModule,
    DrinksModule
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
