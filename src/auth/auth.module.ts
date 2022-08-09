import { Module } from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Users, UsersSchema} from "src/user/schema/user.schema";

@Module({
  imports: [ 
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('EXPIRES_IN'),
          audience: configService.get('APP_URL')
        }
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema
      }
    ]),
  ],
  controllers: [ AuthController ],
  providers: [ 
    AuthService, 
  ],
  
})

export class AuthModule {}
