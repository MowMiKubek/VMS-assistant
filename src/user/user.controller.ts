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
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Cost } from 'src/costs/entities/cost.entity';

@ApiTags('user')
@UseInterceptors(SerializeInterceptor)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({
        description: 'User was created, user object as response',
        type: User,
    })
    @ApiBadRequestResponse({
        description:
            'Incorrect fields in request body, error object (fields: message, error, statusCode) as response',
    })
    @ApiUnprocessableEntityResponse({
        description:
            'Integrity error from database, violation of eighter duplicate or foreign key constraint, error object as response',
    })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({
        description: 'List of users as response',
        type: [User],
    })
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({
        description: 'User object or empty object as response',
        type: User,
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @ApiOperation({ summary: 'Get a user by login' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({
        description: 'list of vehicles owned by user',
        type: [Vehicle],
    })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Get(':id/vehicles')
    getVehicles(@Param('id') id: string) {
        return this.userService.getVehicles(+id);
    }

    @ApiOperation({ summary: 'Get a user by login' })
    @ApiParam({
        name: 'id',
        example: 1,
        description: 'id of user',
        type: [Ticket],
    })
    @ApiOkResponse({ description: 'list of tickets owned by user' })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Get(':id/tickets')
    getTickets(@Param('id') id: string) {
        return this.userService.getTickets(+id);
    }

    @ApiOperation({ summary: 'Get a user by login' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'list of costs owned by user', type: [Cost] })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Get(':id/costs')
    getCosts(@Param('id') id: string) {
        return this.userService.getCosts(+id);
    }

    // Permission section
    @ApiOperation({ summary: 'Grant driving permission to user.' })
    @Post(':id/permissions')
    addPermission(
        @Param('id') id: string,
        @Body() permission: CreatePermissionDto,
    ) {
        return this.userService.addPermission(+id, permission);
    }

    @ApiOperation({ summary: 'Revoke driving permission from user.' })
    @Delete(':id/permissions')
    deletePermission(
        @Param('id') id: string,
        @Body() permission: CreatePermissionDto,
    ) {
        return this.userService.deletePermission(+id, permission);
    }

    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiOkResponse({
        description: 'User updated successfully, user object as response',
        type: User,
    })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiOkResponse({
        description:
            'Object contaning field "affected", which is number of removed records',
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
