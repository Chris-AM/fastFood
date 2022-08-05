import {IsNotEmpty, IsNumber} from "class-validator";

export class ShoppingCartDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly total: Number;
}
