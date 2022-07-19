import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [ 
    AuthModule,
    ConfigModule.forRoot({
      envFilePath:[ '.env.development' ],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB)
  ],
})

export class AppModule {}
