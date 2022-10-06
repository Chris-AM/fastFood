import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
    const payload = { id: flatUser._id }
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

  public async registryFromMaintainer(userBody: MaintainerRegisterAuthDto) {
    const { password, role, ...user } = userBody;
    const parsedUser = {
      ...user,
      password: await plainToHash(password),
      role: ['admin']
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
    const payload = { id: flatUser._id }
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

  public async login(userLoginBody: LoginAuthDto) {
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

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: flatUser,
    };

    this.eventEmiiter.emit('user.logged', data);

    return data;
  }
}
