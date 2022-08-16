import {ApiProperty} from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { IngredientType } from "../schema/ingredient.enum";

export class IngredientDTO{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly type: IngredientType;
  @ApiProperty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly inStock: boolean;
  readonly image: string;
}
