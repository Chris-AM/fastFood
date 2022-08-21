import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserDTO{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly adress: string;
  @ApiProperty()
  readonly phoneCode: string; //default: +569
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly phoneNumber: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiProperty()
  @IsString()
  readonly role: string[]; //default: user
}
