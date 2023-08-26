import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { FuelType } from "../fueltype.enum";
import { ApiProperty } from "@nestjs/swagger";

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
    VIN: string;
    
    @ApiProperty({
        description: 'registration number',
        example: 'DW 9PS69',
        required: false
    })
    @IsOptional()
    @IsString()
    nr_rejestracyjny: string;
    
    @ApiProperty({
        description: 'first registration date',
        example: '2023-08-10T15:00.00Z',
        required: false,
        type: Date
    })
    @IsOptional()
    @IsDateString()
    data_pierw_rej: Date;

    @ApiProperty({
        description: 'type of fuel',
        example: FuelType.Diesel,
    })
    @IsEnum(FuelType)
    typ_paliwa: FuelType;
    
    @ApiProperty({
        description: 'vehicle category',
        example: '###in development###',
        required: false
    })
    @IsOptional()
    @IsString()
    kategoria: string;

    @ApiProperty({
        description: 'Id of user (owner)',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    id_user: number;
}
