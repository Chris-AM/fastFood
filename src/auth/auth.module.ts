import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/user/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleService } from './social-logins/google.service';
import { FacebookService } from './social-logins/facebook.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '4d' },
        };
      },
    }),
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
    GoogleService, 
    FacebookService,
  ],
})
export class AuthModule {}
