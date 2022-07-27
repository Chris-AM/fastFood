import { Module } from '@nestjs/common';
import { PRODUCT } from 'src/common/models/models';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientModule } from 'src/ingredient/ingredient.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PRODUCT.name,
        useFactory: () =>
          ProductSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    IngredientModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
