import { CreateUserDto } from "./create-user.dto";
import { PartialType, OmitType } from "@nestjs/swagger";

export class UpdateUserRegularDto extends PartialType(OmitType(CreateUserDto, ['rola', 'status'])) {}