import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductDTO } from '../../product/dto/product.dto';
import { DrinksDto } from '../../drinks/dto/drinks.dto';

export class MenuDTO {
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
  readonly products: ProductDTO[];
  @ApiProperty()
  @IsNotEmpty()
  readonly drinks: DrinksDto[];
}
