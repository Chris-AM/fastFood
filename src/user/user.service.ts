import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { plainToHash } from 'src/auth/utils/handleBCrypt';
import { Response } from 'express';
import { of } from 'rxjs';
import { join } from 'path';
import { UpdateUserDTO } from './dto/update-user.dto';

interface ModelExt<T> extends Model<T> {
  paginate: Function;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: ModelExt<UsersDocument>,
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

  async getAllUsers(paginatation: any): Promise<UsersDocument[]> {
    return await this.userModel.paginate({}, paginatation);
  }

  async getUser(id: string, response: Response): Promise<UsersDocument> {
    const userDB = await this.userModel.findOne({ id: id });
    if (!userDB) {
      response.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
      });
    } else {
      return userDB;
    }
  }

  async uploadAvatar(id: string, fileName: string): Promise<UsersDocument> {
    return await this.userModel.findOneAndUpdate(
      { id: id },
      { avatar: fileName },
      { new: true },
    );
  }

  async getAvatar(id: string, res: Response) {
    const userDB = await this.userModel.findOne({ id: id });
    const file = userDB.avatar;
    return of(res.sendFile(join(process.cwd(), './public/' + file)));
  }

  async updateUser(
    id: string,
    userBody: UpdateUserDTO,
    response: Response,
  ): Promise<UsersDocument> {
    const { password, email, ...user } = userBody;
    const parsedUser = {
      ...user,
      email,
      password: await plainToHash(password),
    };
    const doesUserExists = await this.userModel.findOne({ email });
    if (doesUserExists) {
      response.status(400).json({
        ok: false,
        message: 'Correo ya se encuentra en uso',
      });
    }
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id: id },
      parsedUser,
      {
        new: true,
      },
    );
    return updatedUser;
  }

  async deleteUser(id: string): Promise<UsersDocument> {
    return await this.userModel.findOneAndDelete({ id: id });
  }
}
