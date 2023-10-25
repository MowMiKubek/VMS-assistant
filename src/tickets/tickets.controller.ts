import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Request,
    Delete,
    UseGuards,
    ForbiddenException,
    ParseIntPipe,
    NotFoundException,
    Query,
    ParseBoolPipe
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/role.guard';
import { Ticket } from './entities/ticket.entity';
import { DeleteResult } from 'typeorm';
import { Role } from '../auth/role/role.enum';
import { Roles } from '../auth/role/role.decorator';

@ApiTags('tickets')
@ApiHeader({ name: 'Authorization', description: 'JWT access token' })
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(RolesGuard)
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @ApiOperation({ summary: 'Create ticket for current user' })
    @ApiCreatedResponse({ description: 'Ticket was created, ticket object as response', type: Ticket })
    @ApiUnprocessableEntityResponse({ description: 'User with given id does not exist' })
    @ApiBadRequestResponse({ description: 'Incorrect fields in request body, error object as response' })
    @Post()
    createNoParam(@Request() req, @Body() createTicketDto: CreateTicketDto) {
        return this.ticketsService.create(req.user.id, createTicketDto);
    }

    @ApiOperation({ summary: 'Create ticket. Manager route required' })
    @ApiCreatedResponse({ description: 'Ticket was created, ticket object as response', type: Ticket })
    @ApiUnprocessableEntityResponse({ description: 'User with given id does not exist' })
    @ApiBadRequestResponse({ description: 'Incorrect fields in request body, error object as response' })
    @ApiForbiddenResponse({ description: 'Insufficient role' })
    @ApiParam({
        name: 'userid',
        example: 1,
        description: 'id of user that will have ticket created',
        required: false
    })
    @Roles(Role.Manager)
    @Post(':userid')
    create(@Body() createTicketDto: CreateTicketDto, @Param('userid', ParseIntPipe) userId: string) {
        return this.ticketsService.create(+userId, createTicketDto);
    }

    @ApiOperation({ summary: 'Get all tickets' })
    @ApiOkResponse({ description: 'List of tickets as response', type: [Ticket] })
    @ApiQuery({ description: 'Get all tickets, including expired ones', name: 'all', required: false, type: Boolean })
    @Get()
    findAll(@Request() req, @Query('all', ParseBoolPipe) all: boolean = false) {
        if(req.user.role === Role.Manager || req.user.role === Role.Admin)
            return this.ticketsService.findAll(all);
        return this.ticketsService.findByUserId(req.user.id);
    }

    @ApiOperation({ summary: 'Get ticket by id' })
    @ApiOkResponse({ description: 'Ticket object as response', type: Ticket})
    @ApiForbiddenResponse({ description: 'Forbidden resource. Error when user tries to get someone\'s else ticket' })
    @Get(':id')
    async findOne(@Request() req, @Param('id', ParseIntPipe) id: string) {
        const resultTicket = await this.ticketsService.findOne(+id);
        if(!resultTicket)
            throw new NotFoundException(`Ticket record with id ${id} not found`);
        if(resultTicket && req.user.role == Role.User && resultTicket.id_user != req.user.id)
            throw new ForbiddenException('Forbidden resource');
        return resultTicket;
    }

    @ApiOperation({ summary: 'Update ticket by id' })
    @ApiOkResponse({ description: 'Ticket record successfully updated, Ticket object as response', type: Ticket})
    @ApiForbiddenResponse({ description: 'Forbidden resource. Error when user tries to update someone else ticket' })
    @ApiNotFoundResponse({ description: 'Ticket record with given id does not exist' })
    @Patch(':id')
    update(@Request() req, @Param('id', ParseIntPipe) id: string, @Body() updateTicketDto: UpdateTicketDto) {
        return this.ticketsService.update(+id, updateTicketDto, req.user);
    }

    @ApiOperation({ summary: 'Delete ticket by id' })
    @ApiOkResponse({ description: 'DeleteResult object as response', type: DeleteResult })
    @ApiForbiddenResponse({ description: 'Forbidden resource. Error when user tries to remove someone else ticket' })
    @Delete(':id')
    remove(@Request() req, @Param('id', ParseIntPipe) id: string) {
        return this.ticketsService.remove(+id, req.user);
    }
}
