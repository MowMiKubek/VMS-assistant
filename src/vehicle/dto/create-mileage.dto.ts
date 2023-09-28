import { IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMileageDto {
    
    @ApiProperty({ example: 100, description: 'mileage of the vehicle' })
    @IsInt()
    @IsPositive()
    stan_licznika: number;

    @ApiProperty({ example: '2021-08-10T15:00.00Z', description: 'date of the mileage record', required: false })
    @IsDateString()
    data: Date;
}