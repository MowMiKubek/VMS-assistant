import { IsString, IsEmail, IsEnum, IsOptional } from "class-validator";
import { Role } from "../role.enum";

export class CreateUserDto {
    @IsString()
    imie: string;

    @IsString()
    nazwisko: string;

    @IsEmail()
    email: string;

    @IsString()
    login: string;

    @IsString()
    haslo: string;

    @IsOptional()
    @IsEnum(Role)
    rola: Role;
}
