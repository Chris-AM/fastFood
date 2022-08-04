import {IsNotEmpty, IsNumber} from "class-validator";

export class ShoppingCart {
  @IsNotEmpty()
  @IsNumber()
  readonly total: Number;
}
