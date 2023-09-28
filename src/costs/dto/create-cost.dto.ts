import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsString } from "class-validator";

export class CreateCostDto {
    @ApiProperty({ example: 'Mycie samochodu' })
    @IsString()
    nazwa: string;

    @ApiProperty({ example: 'Mycie samochodu na myjni automatycznej' })
    @IsString()
    opis: string;

    @ApiProperty({ example: 15000 })
    @IsInt() // Question: does cost have to be positive?
    koszt: number;

    @ApiProperty({ example: '2021-08-10T15:00.00Z' })
    @IsDateString()
    data: Date;

    @ApiProperty({ example: 1 })
    @IsNumber()
    id_user: number;
}
