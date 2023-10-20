import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({
        description: 'user password, should be from 8 fo 20 characters long (will be implemented in the future)',
        example: 'haslo123'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    haslo: string;

    @ApiProperty({
        description: 'Password confirmation. Same as in `haslo` field',
        example: 'haslo123'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    potwierdz_haslo: string;
}