import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { plainToHash } from 'src/auth/utils/handleBCrypt';
import { Response } from 'express';
import { of } from 'rxjs';
import { join } from 'path';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
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

  async getUser(id: string): Promise<UsersDocument> {
    return await this.userModel.findOne({ id: id });
  }

  async uploadAvatar(id: string, fileName: string): Promise<UsersDocument> {
    return await this.userModel.findOneAndUpdate(
      { id: id },
      { avatar: fileName },
      { new: true },
    );
  }

  async getAvatar(id: string, res: Response) {
    console.log('id', id);
    const userDB = await this.userModel.findOne({ id: id });
    const file = userDB.avatar;
    return of(res.sendFile(join(process.cwd(), './public/' + file)));
  }

  async updateUser(id: string, user: UserDTO): Promise<UsersDocument> {
    return await this.userModel.findOneAndUpdate({ id: id }, user, {
      new: true,
    });
  }

  async deleteUser(id: string): Promise<UsersDocument> {
    return await this.userModel.findOneAndDelete({ id: id });
  }
}
