import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class ShoppingCartDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly total: Number;
}
