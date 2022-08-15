import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class ProductDTO{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly photo: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ingredients: string[];
}
