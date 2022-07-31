import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath:[ '.env.development' ],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    UserModule,
    ProductModule,
    AuthModule,
    IngredientModule,
    MenuModule,
  ],
})

export class AppModule {}
