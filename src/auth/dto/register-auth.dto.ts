import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {LoginAuthDto} from "./login-auth.dto";

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  adress: string;
  @ApiProperty()
  @IsNotEmpty()
  phoneCode: string;
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: number;
}
