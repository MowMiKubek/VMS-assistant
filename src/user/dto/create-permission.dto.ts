import { IsArray, ArrayMinSize, IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionDto {
    @ApiProperty({
        description: 'driving permission category',
        example: ["B", "C", "BE"],
        type: [String]
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsIn(["A", "A1", "A2", "AM", "B", "B1", "BE", "C", "C1", "C1E", "CE", "D", "D1", "D1E", "DE", "T"], {each: true})
    kategoria: string[];
}