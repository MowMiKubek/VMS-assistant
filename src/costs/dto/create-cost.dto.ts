import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCostDto {
    @ApiProperty({ example: 'Mycie samochodu' })
    @IsString({ message: 'Brak nazwy'})
    @MinLength(3, { message: 'Nazwa musi mieć co najmniej $constraint1 znaki' })
    @MaxLength(50, { message: 'Nazwa nie może mieć więcej niż $constraint1 znaków' })
    nazwa: string;

    @ApiProperty({ example: 'Mycie samochodu na myjni automatycznej' })
    @IsString({ message: 'Brak opisu'})
    @MinLength(3, { message: 'Opis musi mieć co najmniej $constraint1 znaki' })
    opis: string;

    @ApiProperty({ example: 15000 })
    @IsInt({ message: 'Koszt musi być liczbą całkowitą'})
    koszt: number;

    @ApiProperty({ example: '2021-08-10T15:00.00Z' })
    @IsDateString({}, { message: 'Niepoprawny format daty' })
    @IsOptional()
    data: Date;
}
