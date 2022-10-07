import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response, Request } from 'express';

import { LoginAuthDto } from './dto/login-auth.dto';
import { comparePassToHash, plainToHash } from './utils/handleBCrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Users, UsersDocument } from 'src/user/schema/user.schema';
import { MaintainerRegisterAuthDto } from './dto/maintainer-register-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmiiter: EventEmitter2,
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
  ) { }

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const parsedUser = {
      ...user,
      password: await plainToHash(password),
    };

    const doesUserExist = await this.userModel.findOne({
      email: userBody.email,
    });

    if (doesUserExist) {
      throw new HttpException(
        'Mail already in use', 
        HttpStatus.BAD_REQUEST
        );
    }

    const newUser = await this.userModel.create(parsedUser);

    const flatUser = newUser.toObject();
    const payload = { id: flatUser._id };
    try {
      const token = this.jwtService.sign(payload);
      const data = {
        token,
        user: flatUser,
      };
      this.eventEmiiter.emit('user.created', data);
      return data;
    } catch (error) {
      console.log('debug error', error);
    }
  }

  public async registryFromMaintainer(
    userBody: MaintainerRegisterAuthDto
    ) {
    const { password, role, ...user } = userBody;
    const parsedUser = {
      ...user,
      password: await plainToHash(password),
      role: ['admin'],
    };

    const doesUserExist = await this.userModel.findOne({
      email: userBody.email,
    });

    if (doesUserExist) {
      throw new HttpException(
        'Mail already in use', 
        HttpStatus.BAD_REQUEST
        );
    }
    const newAdminUser = await this.userModel.create(parsedUser);
    const flatUser = newAdminUser.toObject();
    const payload = { id: flatUser._id };
    try {
      const token = this.jwtService.sign(payload);
      const data = {
        token,
        user: flatUser,
      };
      this.eventEmiiter.emit('user.created', data);
      return data;
    } catch (error) {
      console.log('debug error', error);
    }
  }

  public async login(
    userLoginBody: LoginAuthDto, 
    response: Response
    ) {
    const { password } = userLoginBody;
    const doesUserExist = await this.userModel.findOne({
      email: userLoginBody.email,
    });
    if (!doesUserExist)
      throw new HttpException('Password or mail invalid', HttpStatus.NOT_FOUND);

    const isCheck = await comparePassToHash(password, doesUserExist.password);

    if (!isCheck)
      throw new HttpException('Password or mail invalid', HttpStatus.NOT_FOUND);

    const flatUser = doesUserExist.toObject();
    delete flatUser.password;

    const payload = { id: flatUser._id };

    const accessToken = await this.jwtService.signAsync(
      payload, { expiresIn: '30s' }
    );

    console.log('debug accessToken', accessToken);

    const refreshToken = await this.jwtService.signAsync(payload);

    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const data = {
      token: accessToken,
      user: flatUser,
    };

    this.eventEmiiter.emit('user.logged', data);

    return data;
  }

  public async refresh(
    request: Request, 
    response: Response
    ) {
    try {
      const refreshToken = request.headers['x-token'];
      const { id } = await this.jwtService.verifyAsync(refreshToken.toString());
      console.log('id ===> ', id)
      const token = await this.jwtService.signAsync(
        { id }, 
        { expiresIn: '30s' }
      );
      console.log('token ===>', token);
      return { token };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
