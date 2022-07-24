import {IsEmail, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserDTO{
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly adress: string;
  // @IsNotEmpty()
  @IsString()
  readonly phoneCode: string; //default: +569
  @IsNotEmpty()
  @IsNumber()
  readonly phoneNumber: number;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
