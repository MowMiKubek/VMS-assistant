import { IsArray, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";

export class CreatePermissionDto {
    @IsArray()
    @ArrayMinSize(1)
    // @ValidateNested( {each: true} )
    @Type(() => String)
    kategoria: string[];
}