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
    ForbiddenException
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
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Ticket } from './entities/ticket.entity';
import { DeleteResult } from 'typeorm';
import { Role } from 'src/auth/role/role.enum';

@ApiTags('tickets')
@ApiHeader({ name: 'Authorization', description: 'JWT access token' })
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(RolesGuard)
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @ApiOperation({ summary: 'Create ticket' })
    @ApiHeader({ name: 'Authorization',description: 'JWT access token' })
    @ApiCreatedResponse({ description: 'Ticket was created, ticket object as response', type: Ticket })
    @ApiUnprocessableEntityResponse({ description: 'User with given id does not exist' })
    @ApiBadRequestResponse({ description: 'Incorrect fields in request body, error object as response' })
    @ApiForbiddenResponse({ description: 'Insufficient role. Error when user tries to assign ticket to someone else' })
    @ApiParam({
        name: 'userid',
        example: 1,
        description: 'id of user that will have ticket created',
        required: false
    })
    @Post(':userid?')
    create(@Request() req, @Body() createTicketDto: CreateTicketDto, @Param('userid') userId?: string) {
        if(userId === undefined) 
            return this.ticketsService.create(req.user.id, createTicketDto);
        else if (req.user.role ===  Role.Manager || req.user.role === Role.Admin )
            return this.ticketsService.create(+userId, createTicketDto);
        throw new ForbiddenException('Insufficient role');
    }

    @ApiOperation({ summary: 'Get all tickets' })
    @ApiOkResponse({ description: 'List of tickets as response', type: [Ticket] })
    @Get()
    findAll(@Request() req) {
        if(req.user.role === Role.Manager || req.user.role === Role.Admin)
            return this.ticketsService.findAll();
        if(req.user.role === Role.User) 
            return this.ticketsService.findByUserId(req.user.id);
    }

    @ApiOperation({ summary: 'Get ticket by id' })
    @ApiOkResponse({ description: 'Ticket object as response', type: Ticket})
    @ApiForbiddenResponse({ description: 'Forbidden resource. Error when user tries to get someone\'s else ticket' })
    @Get(':id')
    async findOne(@Request() req, @Param('id') id: string) {
        const resultTicket = await this.ticketsService.findOne(+id);
        if(resultTicket && req.user.role == Role.User && resultTicket.id_user != req.user.id)
            throw new ForbiddenException('Forbidden resource');
        return resultTicket;
    }

    @ApiOperation({ summary: 'Update ticket by id' })
    @ApiOkResponse({ description: 'Ticket record successfully updated, Ticket object as response', type: Ticket})
    @ApiForbiddenResponse({ description: 'Forbidden resource. Error when user tries to update someone else ticket' })
    @ApiNotFoundResponse({ description: 'Ticket record with given id does not exist' })
    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
        return this.ticketsService.update(+id, updateTicketDto, req.user);
    }

    @ApiOperation({ summary: 'Delete ticket by id' })
    @ApiOkResponse({ description: 'DeleteResult object as response', type: DeleteResult })
    @ApiForbiddenResponse({ description: 'Forbidden resource. Error when user tries to remove someone else ticket' })
    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        return this.ticketsService.remove(+id, req.user);
    }
}
