import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema, Products } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientModule } from 'src/ingredient/ingredient.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Products.name,
        useFactory: () =>
          ProductSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    IngredientModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
