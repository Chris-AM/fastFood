import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/user/schema/user.schema';
import {LoginAuthDto} from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {comparePassToHash, plainToHash} from './utils/handleBCrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
  ) {}

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const parsedUser = {
      ...user, password: await plainToHash(password)
    }
    return this.userModel.create(parsedUser);
  }

  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;
    const doesUserExist = 
      await this.userModel.findOne({email: userLoginBody.email})
    if (!doesUserExist) 
      throw new HttpException('Password or mail invalid',
        HttpStatus.NOT_FOUND);
    const isCheck = 
      await comparePassToHash(password, doesUserExist.password);
    if(!isCheck) 
      throw new HttpException('Password or mail invalid',
        HttpStatus.NOT_FOUND);
    const flatUser = doesUserExist.toObject()
    delete flatUser.password

    const payload = { id: flatUser._id }

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: flatUser
    }
    return data;
  }
}
