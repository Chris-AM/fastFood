import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/user/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { comparePassToHash, plainToHash } from './utils/handleBCrypt';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmiiter: EventEmitter2,
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
  ) {}

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const parsedUser = {
      ...user,
      password: await plainToHash(password),
    };

    const newUser = await this.userModel.create(parsedUser);

    this.eventEmiiter.emit('user.created', newUser);

    return newUser;
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
