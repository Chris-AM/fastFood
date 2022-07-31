import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adress: { type: String, required: true },
  phoneCode: { type: String, required: true, default: '+569'},
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
},);
UserSchema.index({email: 1}, {unique:true});
UserSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  return object;
});
