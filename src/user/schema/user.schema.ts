import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type UsersDocument = Users & Document;

@Schema({timestamps: true})
export class Users {
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
}

export const UsersSchema =
  SchemaFactory.createForClass(Users);

