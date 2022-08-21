import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID, } from "class-validator";
import { IngredientDTO } from "src/ingredient/dto/ingredient.dto";

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
  readonly photo: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly ingredients: IngredientDTO[];
}
