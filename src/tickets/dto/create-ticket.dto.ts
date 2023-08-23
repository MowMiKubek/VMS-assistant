import { IsDate,  IsDateString,  IsInt, IsPositive, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    nazwa: string;

    @IsInt()
    @IsPositive()
    liczba_punktow: number;

    @IsInt()
    @IsPositive()
    waznosc: number;

    @IsDateString()
    data_wystawienia: Date;

    @IsInt()
    @IsPositive()
    cena: number;
}
