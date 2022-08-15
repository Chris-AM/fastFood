import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

export type UsersDocument = Users & Document;

@Schema({timestamps: true})
export class Users {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop({required: true})
  name: string;
  @Prop({required: true, unique: true})
  email: string;
  @Prop({required: true})
  adress: string;
  @Prop({default: '+569'})
  phoneCode: string;
  @Prop({required: true})
  phoneNumber: number;
  @Prop({required: true})
  password: string;  
  @Prop()
  avatar: string;
  @Prop({default:['user']})
  role: string[];
}

export const UsersSchema =
  SchemaFactory.createForClass(Users);

