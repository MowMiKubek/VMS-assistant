import { ApiProperty } from "@nestjs/swagger";
import { IsDateString,  IsInt, IsPositive, IsString } from "class-validator";

export class CreateTicketDto {
    @ApiProperty({ example: 'Przekroczenie prędkości '})
    @IsString()
    nazwa: string;

    @ApiProperty({ example: 10 })
    @IsInt()
    @IsPositive()
    liczba_punktow: number;

    @ApiProperty({ example: 12 })
    @IsInt()
    @IsPositive()
    waznosc: number;

    @ApiProperty({ example: '2023-08-10T15:00.00Z'})
    @IsDateString()
    data_wystawienia: Date;

    @ApiProperty({ example: 800000 })
    @IsInt()
    @IsPositive()
    cena: number;
}
