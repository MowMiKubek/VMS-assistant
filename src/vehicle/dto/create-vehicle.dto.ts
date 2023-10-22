import { IsDateString, IsEnum, IsNumber, IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { FuelType } from "../fueltype.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import * as moment from "moment";

export class CreateVehicleDto {
    @ApiProperty({ description: 'car brand', example: 'volkswagen' })
    @IsString({ message: 'Brak marki pojazdu' })
    @MaxLength(20, { message: 'Maksymalna długość pola $property wynosi $constraint1 znaków '})
    marka: string;
    
    @ApiProperty({ description: 'car model', example: 'passat' })
    @IsString({ message: 'Brak modelu pojazdu' })
    @MaxLength(20, { message: 'Maksymalna długość pola $property wynosi $constraint1 znaków '})
    model: string;

    @ApiProperty({ description: 'car production year', example: '2006', type: Number })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Rocznik musi być liczbą' })
    rocznik: number;
    
    @ApiProperty({ description: 'car VIN', example: '1G1AF1F57A7192174', required: false })
    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'VIN musi mieć co najmniej $constraint1 znaki' })
    @MaxLength(17, { message: 'VIN nie może mieć więcej niż $constraint1 znaków' })
    @Transform(({ value }) => value.trim().toUpperCase())
    VIN: string;
    
    @ApiProperty({ description: 'registration number', example: 'DW 9PS69', required: false })
    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'Numer rejestracyjny musi mieć co najmniej $constraint1 znaki' })
    @MaxLength(15, { message: 'Numer rejestracyjny nie może mieć więcej niż $constraint1 znaków' })
    @Transform(({ value }) => value.trim().toUpperCase().split(' ').join(''))
    nr_rejestracyjny: string;
    
    @ApiProperty({ description: 'first registration date.', example: '2023-08-10', required: false, type: Date })
    @IsOptional()
    @IsDateString({}, { message: 'Niepoprawny format daty' })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    data_pierw_rej: Date;

    @ApiProperty({ description: 'type of fuel', type: 'enum', enum: FuelType, example: FuelType.Diesel })
    @IsEnum(FuelType, { message: 'Poprawne typy paliwa to: $constraint2' })
    typ_paliwa: FuelType;
    
    @ApiProperty({ description: 'required driving category', example: 'B', required: false })
    @IsOptional()
    @IsString()
    @IsIn(["A", "A1", "A2", "AM", "B", "B1", "BE", "C", "C1", "C1E", "CE", "D", "D1", "D1E", "DE", "T"], { message: 'Poprawne kategorie to: $constraint1' })
    kategoria: string;
}
