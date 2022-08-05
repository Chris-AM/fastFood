import {ApiProperty} from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class IngredientDTO{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly type: string;
  @ApiProperty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly inStock: boolean;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly image: string;

}
