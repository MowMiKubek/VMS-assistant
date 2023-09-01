import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@ApiTags('user')
@UseInterceptors(SerializeInterceptor)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiCreatedResponse({
        description: 'User was created, user object as response',
        type: User
    })
    @ApiBadRequestResponse({
        description:
            'Incorrect fields in request body, error object (fields: message, error, statusCode) as response',
    })
    @ApiUnprocessableEntityResponse({
      description: 'Integrity error from database, violation of eighter duplicate or foreign key constraint, error object as response'
    })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOkResponse({
      description: 'List of users as response',
      type: [User]
    })
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'User object or empty object as response', type: User })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'list of vehicles owned by user', type: [Vehicle] })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Get(':id/vehicles')
    getVehicles(@Param('id') id: string) {
        return this.userService.getVehicles(+id);
    }

    @ApiParam({ name: 'id', example: 1, description: 'id of user', type: [Ticket] })
    @ApiOkResponse({ description: 'list of tickets owned by user' })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Get(':id/tickets')
    getTickets(@Param('id') id: string) {
        return this.userService.getTickets(+id);
    }

    @ApiOkResponse({ description: 'User updated successfully, user object as response', type: User})
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @ApiOkResponse({ description: 'Object contaning field "affected", which is number of removed records' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
