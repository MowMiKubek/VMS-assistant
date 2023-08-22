import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { FuelType } from "../fueltype.enum";

export class CreateVehicleDto {
    @IsString()
    marka: string;
    
    @IsString()
    model: string;

    @IsNumber()
    rocznik: number;
    
    @IsOptional()
    @IsString()
    VIN: string;
    
    @IsOptional()
    @IsString()
    nr_rejestracyjny: string;
    
    @IsOptional()
    @IsDateString()
    data_pierw_rej: Date;

    @IsEnum(FuelType)
    typ_paliwa: FuelType;
    
    @IsOptional()
    @IsString()
    kategoria: string;

    @IsOptional()
    @IsNumber()
    id_user: number;
}
