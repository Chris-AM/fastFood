import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema, Products } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Ingredients,
  IngredientSchema,
} from 'src/ingredient/schema/ingredient.schema';
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
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductSchema },
      { name: Ingredients.name, schema: IngredientSchema },
    ]),
    IngredientModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
