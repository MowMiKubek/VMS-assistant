import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Req,
    UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiHeader,
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
import { Cost } from '../costs/entities/cost.entity';
import { Roles } from '../auth/role/role.decorator';
import { Role } from '../auth/role/role.enum';

@ApiTags('user')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', description: 'JWT auth token' })
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Create a new user. Admin role required' })
    @ApiCreatedResponse({description: 'User was created, user object as response', type: User})
    @ApiBadRequestResponse({description:
        'Incorrect fields in request body, error object (fields: message, error, statusCode) as response',
    })
    @ApiUnprocessableEntityResponse({
        description:
            'Integrity error from database, violation of eighter duplicate or foreign key constraint, error object as response',
    })
    @Roles(Role.Admin)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Get all users. Manager role required' })
    @ApiOkResponse({ description: 'List of users as response', type: [User] })
    @Roles(Role.Manager)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Get a user by ID. Manager role required' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'User object or empty object as response', type: User })
    @Roles(Role.Manager)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        return this.userService.findOne(+id);
    }

    @ApiOperation({ summary: 'Get a user by login. Manager role required.' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'list of vehicles owned by user', type: [Vehicle] })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Roles(Role.Manager)
    @Get(':id/vehicles')
    getVehicles(@Param('id', ParseIntPipe) id: string) {
        return this.userService.getVehicles(+id);
    }

    @ApiOperation({ summary: 'Get a user by login. Manager role required.' })
    @ApiParam({
        name: 'id',
        example: 1,
        description: 'id of user',
        type: [Ticket],
    })
    @ApiOkResponse({ description: 'list of tickets owned by user' })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Roles(Role.Manager)
    @Get(':id/tickets')
    getTickets(@Param('id', ParseIntPipe) id: string) {
        return this.userService.getTickets(+id);
    }

    @ApiOperation({ summary: 'Get a user by login. Manager role required.' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'list of costs owned by user', type: [Cost] })
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Roles(Role.Manager)
    @Get(':id/costs')
    getCosts(@Param('id', ParseIntPipe) id: string) {
        return this.userService.getCosts(+id);
    }

    // Permission section
    @ApiOperation({ summary: 'Grant driving permission to user. Admin role required' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @Roles(Role.Admin)
    @Post(':id/permissions')
    addPermission(@Param('id', ParseIntPipe) id: string, @Body() permission: CreatePermissionDto) {
        return this.userService.addPermission(+id, permission);
    }

    @ApiOperation({ summary: 'Revoke driving permission from user. Admin role required' })
    @ApiParam({ name: 'id', example: 1, description: 'id of user' })
    @Roles(Role.Admin)
    @Delete(':id/permissions')
    deletePermission(
        @Param('id', ParseIntPipe) id: string,
        @Body() permission: CreatePermissionDto,
    ) {
        return this.userService.deletePermission(+id, permission);
    }

    @ApiOperation({ summary: 'Update a user by ID. Admin role required' })
    @ApiOkResponse({description: 'User updated successfully, user object as response', type: User})
    @ApiNotFoundResponse({ description: 'user with given id does not exist' })
    @Roles(Role.Admin)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete a user by ID. Admin role required' })
    @ApiOkResponse({ description: 'Object contaning field "affected", which is number of removed records' })
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string) {
        return this.userService.remove(+id);
    }
}
