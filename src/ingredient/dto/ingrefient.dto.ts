import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class IngredientDTO{
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly type: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly inStock: boolean;
  @IsString()
  @IsNotEmpty()
  readonly image: string;

}
