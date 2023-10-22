import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIn, IsInt, IsString, IsPositive, IsOptional } from "class-validator";

export class CreateEventDto {
    @ApiProperty({ example: 'Przegląd samochodu' })
    @IsString({ message: 'Brak nazwy' })
    nazwa: string;

    @ApiProperty({ example: 'Przegląd techniczny samochodu' })
    @IsString({ message: 'Brak opisu' })
    opis: string;

    @ApiProperty({ example: '2023-08-10T15:00.00Z' })
    @IsDateString({}, { message: 'Niepoprawny format daty' })
    data: Date;

    @ApiProperty({ example: 10000 })
    @IsInt({ message: 'Koszt musi być liczbą całkowitą' })
    koszt: number;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsIn([0, 1], { message: 'Poprawne wartości pola $property to $constraint1' })
    czy_przypomniec: number;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsIn([0, 1], { message: 'Poprawne wartości pola $property to $constraint1' })
    czy_okresowe: number;

    @ApiProperty({ description: 'Period of event (if `czy_przypomniec` set to 1). In months', example: 12 })
    @IsOptional()
    @IsInt({ message: 'Okres musi być liczbą całkowitą' })
    @IsPositive({ message: 'Okres musi być liczbą dodatnią' })
    okres: number;
}
