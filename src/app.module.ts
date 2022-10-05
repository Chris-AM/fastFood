import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { MenuModule } from './menu/menu.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailsModule } from './emails/emails.module';
import { DrinksModule } from './drinks/drinks.module';
import { SocketProvider } from './providers/socket-provider';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 3600,
      max: 1000,
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
    EmailsModule,
    DrinksModule,
  ],
  providers: [SocketProvider],
})
export class AppModule {}
