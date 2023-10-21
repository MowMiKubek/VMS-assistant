import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { FuelType } from "../fueltype.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import * as moment from "moment";

export class CreateVehicleDto {
    @ApiProperty({
        description: 'car brand',
        example: 'volkswagen'
    })
    @IsString()
    marka: string;
    
    @ApiProperty({
        description: 'car model',
        example: 'passat'
    })
    @IsString()
    model: string;

    @ApiProperty({
        description: 'car production year',
        example: '2006',
        type: Number
    })
    @IsNumber()
    rocznik: number;
    
    @ApiProperty({
        description: 'car VIN',
        example: '1G1AF1F57A7192174',
        required: false
    })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(17)
    @Transform(({ value }) => value.trim().toUpperCase())
    VIN: string;
    
    @ApiProperty({
        description: 'registration number',
        example: 'DW 9PS69',
        required: false
    })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @Transform(({ value }) => value.trim().toUpperCase().split(' ').join(''))
    nr_rejestracyjny: string;
    
    @ApiProperty({
        description: 'first registration date. WARNING - format: YYYY-MM-DD (YYYY-MM-DDThh:mm:ss.sssZ not secured!))',
        example: '2023-08-10',
        required: false,
        type: Date
    })
    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    data_pierw_rej: Date;

    @ApiProperty({
        description: 'type of fuel',
        example: FuelType.Diesel,
        type: 'enum',
        enum: FuelType
    })
    @IsEnum(FuelType)
    typ_paliwa: FuelType;
    
    @ApiProperty({
        description: 'required driving category',
        example: 'B',
        required: false
    })
    @IsOptional()
    @IsString()
    kategoria: string;
}
