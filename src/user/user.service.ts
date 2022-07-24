import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  
  constructor(@InjectModel(USER.name) 
    private readonly model: Model<IUser>){}

  async hashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async createUser(userDto: UserDTO): Promise<IUser> {
    const hash = await this.hashedPassword(userDto.password);
    const newUser = new this.model({...userDto, password: hash});
    return await newUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.model.find();
  }

}
