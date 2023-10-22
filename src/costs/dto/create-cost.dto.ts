import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCostDto {
    @ApiProperty({ example: 'Mycie samochodu' })
    @IsString({ message: 'Brak nazwy'})
    nazwa: string;

    @ApiProperty({ example: 'Mycie samochodu na myjni automatycznej' })
    @IsString({ message: 'Brak opisu'})
    opis: string;

    @ApiProperty({ example: 15000 })
    @IsInt({ message: 'Koszt musi być liczbą całkowitą'})
    koszt: number;

    @ApiProperty({ example: '2021-08-10T15:00.00Z' })
    @IsDateString({}, { message: 'Niepoprawny format daty' })
    @IsOptional()
    data: Date;
}
