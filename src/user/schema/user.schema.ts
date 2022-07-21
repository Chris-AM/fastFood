import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  adress: { type: String, required: true },
  phoneCode: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: Number, required: true }
}, {
  timestamps: true
},);
UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique:true});
