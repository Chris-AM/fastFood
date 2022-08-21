import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { MenuDTO } from '../../menu/dto/menu.dto';
import { ProductDTO } from '../../product/dto/product.dto';
import { DrinksDto } from '../../drinks/dto/drinks.dto';

export class ShoppingCartDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly total: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly orderer: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly menus: MenuDTO[];
  @ApiProperty()
  @IsNotEmpty()
  readonly products: ProductDTO[];
  @ApiProperty()
  @IsNotEmpty()
  readonly drinks: DrinksDto[];
}
