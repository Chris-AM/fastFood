import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menus, MenuSchema } from './schema/menu.schema';
import { ProductModule } from 'src/product/product.module';
import { Products, ProductSchema } from 'src/product/schema/product.schema';
import { Drinks, DrinksSchema } from '../drinks/schema/drink.schema';
import { DrinksModule } from '../drinks/drinks.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Menus.name,
        useFactory: () => 
          MenuSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    MongooseModule.forFeature([
      { name: Menus.name, schema: MenuSchema },
      { name: Products.name, schema: ProductSchema },
      { name: Drinks.name, schema: DrinksSchema },
    ]),
    ProductModule,
    DrinksModule
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
