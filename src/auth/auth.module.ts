import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users, UsersSchema } from 'src/user/schema/user.schema';
import { RefreshTokenStrategy } from './strategy/jwt-refresh.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleService } from './social-logins/google.service';
import { FacebookService } from './social-logins/facebook.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy, 
    RefreshTokenStrategy,
    GoogleService, 
    FacebookService,
  ],
})
export class AuthModule {}
