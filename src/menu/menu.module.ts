import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MENU } from 'src/common/models/models';
import {ProductModule} from 'src/product/product.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import {MenuSchema} from './schema/menu.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: MENU.name,
        useFactory: () => 
          MenuSchema.plugin(require('mongoose-autopopulate'))
      }
    ]),
    ProductModule
  ],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
