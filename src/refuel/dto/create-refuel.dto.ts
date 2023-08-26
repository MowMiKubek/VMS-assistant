import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsEnum, IsPositive, IsInt, Min, Max, IsOptional } from "class-validator";
import { FuelType } from "src/vehicle/fueltype.enum";

export class CreateRefuelDto {
    @ApiProperty({ example: 50.02 })
    @IsNumber()
    ilosc_paliwa: number;

    @ApiProperty({ example: FuelType.Benzyna })
    @IsEnum(FuelType)
    typ_paliwa: FuelType;

    @ApiProperty({ example: 649})
    @IsInt()
    @IsPositive()
    cena_za_litr: number;

    @ApiProperty({ example: 32463 })
    @IsInt()
    @IsPositive()
    cena: number;

    @ApiProperty({ example: 0, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    blokada: number;
}
