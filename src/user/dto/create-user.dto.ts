import { IsString, IsEmail, IsEnum, IsOptional } from "class-validator";
import { Role } from "../../auth/role/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'user name',
        example: 'Jan'
    })
    @IsString()
    imie: string;

    @ApiProperty({
        description: 'user lastname',
        example: 'Nowak'
    })
    @IsString()
    nazwisko: string;

    @ApiProperty({
        description: 'user email, should be unique',
        example: 'jan@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'user login, should be unique',
        example: 'jnowak'
    })
    @IsString()
    login: string;

    @ApiProperty({
        description: 'user password, should be from 8 fo 20 characters long (will be implemented in the future)',
        example: 'haslo123'
    })
    @IsString()
    haslo: string;

    @ApiProperty({ 
        enum: Role,
        description: 'user role name',
        default: Role.User
     })
    @IsOptional()
    @IsEnum(Role)
    rola: Role;
}
