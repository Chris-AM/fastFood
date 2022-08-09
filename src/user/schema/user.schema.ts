import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type UsersDocument = Users & Document;

@Schema()
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
}

export const UsersSchema =
  SchemaFactory.createForClass(Users);

