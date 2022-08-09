import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly model: Model<UsersDocument>,
  ) {}

  
}
