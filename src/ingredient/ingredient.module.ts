import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { INGREDIENT } from 'src/common/models/models';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { IngredientSchema } from './schema/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: INGREDIENT.name,
        useFactory: ()=> {
          return IngredientSchema;          
        },
      },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService]
})
export class IngredientModule {}
