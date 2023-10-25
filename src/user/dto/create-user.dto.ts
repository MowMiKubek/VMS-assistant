import { IsString, IsEmail, IsEnum, IsOptional, MinLength, MaxLength } from "class-validator";
import { Role } from "../../auth/role/role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "../enums/status.enum";

export class CreateUserDto {
    @ApiProperty({ description: 'user name', example: 'Jan' })
    @MinLength(3, { message: "Imię musi mieć co najmniej $constraint1 znaki" })
    @MaxLength(20, { message: 'Imię nie może mieć więcej niż 20 znaków' })
    @IsString()
    imie: string;

    @ApiProperty({ description: 'user lastname', example: 'Nowak' })
    @MinLength(3, { message: "Nazwisko musi mieć co najmniej $constraint1 znaki" })
    @MaxLength(20, { message: 'Nazwisko nie może mieć więcej niż 20 znaków' })
    @IsString({ message: "Brak nazwiska" })
    nazwisko: string;

    @ApiProperty({ description: 'user email, should be unique', example: 'jan@gmail.com' })
    @IsEmail({}, { message: "$value nie jest poprwanym adresem email" })
    email: string;

    @ApiProperty({ description: 'user login, should be unique', example: 'jnowak' })
    @IsString({ message: "Brak loginu" })
    @MinLength(3, { message: "Login musi mieć co najmniej $constraint1 znaki" })
    @MaxLength(20, { message: "Login nie może mieć więcej niż $constraint1 znaków" })
    login: string;

    @ApiProperty({ description: 'user password, should be from 8 fo 20 characters long', example: 'haslo123'})
    @IsString({ message: "Brak hasła" })
    @MinLength(8, { message: "Hasło musi mieć co najmniej $constraint1 znaków" })
    @MaxLength(20, { message: "Hasło nie może mieć więcej niż $constraint1 znaków" })
    haslo: string;

    @ApiProperty({  enum: Role, description: 'user role name', default: Role.User })
    @IsOptional()
    @IsEnum(Role, { message: "Poprawne role to: $constraint2" })
    rola: Role;

    @ApiProperty({ type: 'enum', enum: UserStatus, description: 'user status', default: UserStatus.Active })
    @IsOptional()
    @IsEnum(UserStatus, { message: "Poprawne statusy to: $constraint2" })
    status: UserStatus;
}
