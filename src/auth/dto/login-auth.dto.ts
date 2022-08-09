import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, MaxLength, MinLength} from "class-validator";

export class LoginAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @MinLength(4)
  @MaxLength(8)
  password: string;
}
