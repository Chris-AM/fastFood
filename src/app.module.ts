import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { MenuModule } from './menu/menu.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import {ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { EventEmailModule } from './event-email/event-email.module';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { EmailsModule } from './emails/emails.module';
import { DrinksModule } from './drinks/drinks.module';

@Module({
  imports: [ 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath:[ '.env.development' ],
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    UserModule,
    ProductModule,
    AuthModule,
    IngredientModule,
    MenuModule,
    ShoppingCartModule,
    EventEmailModule,
    EmailsModule,
    DrinksModule,
  ],
})

export class AppModule {}
