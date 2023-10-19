import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIn, IsInt, IsString, IsPositive, IsOptional } from "class-validator";

export class CreateEventDto {
    @ApiProperty({ example: 'Przegląd samochodu' })
    @IsString()
    nazwa: string;

    @ApiProperty({ example: 'Przegląd techniczny samochodu' })
    @IsString()
    opis: string;

    @ApiProperty({ example: '2023-08-10T15:00.00Z' })
    @IsDateString()
    data: Date;

    @ApiProperty({ example: 10000 })
    @IsInt()
    koszt: number;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsIn([0, 1])
    czy_przypomniec: number;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsIn([0, 1])
    czy_okresowe: number;

    @ApiProperty({ description: 'Period of event (if `czy_przypomniec` set to 1). In months', example: 12 })
    @IsOptional()
    @IsInt()
    @IsPositive()
    okres: number;
}
