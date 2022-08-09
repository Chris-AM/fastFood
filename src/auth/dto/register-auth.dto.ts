import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterAuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @MinLength(4)
  @MaxLength(16)
  password: string;
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
