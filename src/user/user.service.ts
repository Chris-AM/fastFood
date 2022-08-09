import { Injectable } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly model: Model<IUser>,
  ) {}

  async hashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async createUser(userDto: UserDTO): Promise<IUser> {
    const hash = await this.hashedPassword(userDto.password);
    const newUser = new this.model({ ...userDto, password: hash });
    return await newUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.model.find();
  }

  async getUserByID(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async findUserByEmail(email: string) {
    return await this.model.findOne({email});    
  }

  async checkPassword(
    password: string,
    passwordDB: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  } 

  async updateUser(id: string, userDto: UserDTO): Promise<IUser> {
    const hash = await this.hashedPassword(userDto.password);
    const updatedUser = { ...userDto, password: hash };
    return await this.model.findByIdAndUpdate(id, updatedUser, { new: true });
  }

  async deleteUser(id: string): Promise<IUser> {
    return await this.model.findByIdAndDelete(id);
  }
}
