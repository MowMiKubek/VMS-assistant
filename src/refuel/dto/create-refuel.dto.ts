import { IsNumber, IsEnum, IsPositive, IsInt, Min, Max, IsOptional } from "class-validator";
import { FuelType } from "src/vehicle/fueltype.enum";

export class CreateRefuelDto {
    @IsNumber()
    ilosc_paliwa: number;

    @IsEnum(FuelType)
    typ_paliwa: FuelType;

    @IsInt()
    @IsPositive()
    cena_za_litr: number;

    @IsInt()
    @IsPositive()
    cena: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    blokada: number;
}
