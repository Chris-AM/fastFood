import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DrinksDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly inStock: boolean;
    @ApiProperty()
    readonly photo: string;
}
