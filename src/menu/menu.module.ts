import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menus, MenuSchema } from './schema/menu.schema';
import { ProductModule } from 'src/product/product.module';
import { Products, ProductSchema } from 'src/product/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Menus.name, schema: MenuSchema },
      { name: Products.name, schema: ProductSchema }
    ]),
    ProductModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
