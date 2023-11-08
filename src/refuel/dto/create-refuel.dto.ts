import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsEnum, IsPositive, IsInt, IsOptional, IsIn } from "class-validator";
import { FuelType } from "../../vehicle/fueltype.enum";

export class CreateRefuelDto {
    @ApiProperty({ example: 50.02 })
    @IsNumber({}, { message: 'Ilość paliwa musi być liczbą' })
    ilosc_paliwa: number;

    @ApiProperty({ example: FuelType.Benzyna, type: 'enum', enum: FuelType })
    @IsEnum(FuelType, { message: 'Niepoprawny typ paliwa. Poprawne wartości: $constraint2' })
    typ_paliwa: FuelType;

    @ApiProperty({ example: 649})
    @IsInt({ message: 'Przebieg musi być liczbą całkowitą' })
    @IsPositive({ message: 'Cena za litr musi być liczbą dodatnią' })
    cena_za_litr: number;

    @ApiProperty({ example: 32463 })
    @IsInt({ message: 'Niepoprawna cena'})
    @IsPositive({ message: 'Cena musi być liczbą dodatnią' })
    cena: number;

    @ApiProperty({ example: "2021-05-01T12:00:00" })
    @IsDateString({}, { message: 'Podaj datę w poprawnym formacie' })
    data: Date;

    @ApiProperty({ example: 0, required: false })
    @IsOptional()
    @IsIn([0, 1], { message: 'Poprawne wartości pola $property to $constraint1' })
    blokada: number;
}
