import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { plainToHash } from 'src/auth/utils/handleBCrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>
  ) {}

  async createUser(userBody: UserDTO): Promise<UsersDocument> {
    const { password, ...user } = userBody;
    const parsedUser = {
      ...user,
      password: await plainToHash(password),
    };
    const newUser = await this.userModel.create(parsedUser);
    return newUser;
  }

  async getAllUsers(): Promise<UsersDocument[]> {
    return await this.userModel.find().exec();
  }

  async getUser(
    id: string
  ): Promise<UsersDocument> {
    return await this.userModel.findOne(
      { id: id },
    )
  }

  async updateUser(
    id: string,
    user: UserDTO,
  ): Promise<UsersDocument> {
    return await this.userModel.findOneAndUpdate(
      { id: id },
      user,
      { new: true },
    );
  }

  async deleteUser(
    id: string
  ): Promise<UsersDocument> {
    return await this.userModel.findOneAndDelete(
      { id: id }
    );
  }
}
