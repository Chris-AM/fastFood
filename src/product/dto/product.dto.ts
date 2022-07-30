import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class ProductDTO{
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @IsNotEmpty()
  readonly photo: string;
  
}
