import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { Ingredients, IngredientSchema } from './schema/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Ingredients.name,
        useFactory: () =>
          IngredientSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
