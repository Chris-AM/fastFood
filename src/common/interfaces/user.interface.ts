export interface IUser extends Document {
  name: string;
  email: string;
  adress: string;
  phoneCode: string; //default: +569
  phoneNumber: number;
  password: string;
}
