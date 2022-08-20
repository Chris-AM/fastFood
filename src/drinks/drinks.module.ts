import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Drinks, DrinksSchema } from './schema/drink.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Drinks.name,
        useFactory: () =>
          DrinksSchema.plugin(require('mongoose-autopopulate')),
      }
    ]),
  ],
  controllers: [DrinksController],
  providers: [DrinksService]
})
export class DrinksModule {}
