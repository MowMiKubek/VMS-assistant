import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'user login',
        example: 'jnowak'
    })
    @IsString()
    login: string;
    
    @ApiProperty({
        description: 'user password',
        example: 'haslo123'
    })
    @IsString()
    password: string;
}