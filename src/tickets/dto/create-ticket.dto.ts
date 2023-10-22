import { ApiProperty } from "@nestjs/swagger";
import { IsDateString,  IsInt, IsPositive, IsString, MinLength, MaxLength } from "class-validator";

export class CreateTicketDto {
    @ApiProperty({ example: 'Przekroczenie prędkości' })
    @IsString({ message: 'Brak nazwy' })
    @MinLength(3, { message: 'Nazwa musi mieć co najmniej $constraint1 znaki' })
    @MaxLength(50, { message: 'Nazwa nie może mieć więcej niż $constraint1 znaków' })
    nazwa: string;

    @ApiProperty({ example: 10 })
    @IsInt({ message: 'Liczba punktów musi być liczbą całkowitą'})
    @IsPositive({ message: 'Liczba punktów powinna być dodatnia' })
    liczba_punktow: number;

    @ApiProperty({ example: 12 })
    @IsInt({ message: 'Ważność musi być liczbą całkowitą'})
    @IsPositive({ message: 'Ważność powinna być liczbą dodatnią' })
    waznosc: number;

    @ApiProperty({ example: '2023-08-10T15:00.00Z'})
    @IsDateString({}, { message: 'Niepoprawny format daty' })
    data_wystawienia: Date;

    @ApiProperty({ example: 800000 })
    @IsInt({ message: 'Niepoprawna cena'})
    @IsPositive({ message: 'Cena powinna być dodatnia' })
    cena: number;
}
