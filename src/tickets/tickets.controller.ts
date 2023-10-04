import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
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
import { Ticket } from './entities/ticket.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @ApiOperation({ summary: 'Create ticket' })
    @ApiCreatedResponse({
        description: 'Ticket was created, ticket object as response',
        type: Ticket,
    })
    @ApiUnprocessableEntityResponse({
        description: 'User with given id does not exist',
    })
    @ApiBadRequestResponse({
        description:
            'Incorrect fields in request body, error object as response',
    })
    @ApiParam({
        name: 'userid',
        example: 1,
        description: 'id of user that will have ticket created',
    })
    @Post(':userid')
    create(
        @Param('userid') userId: string,
        @Body() createTicketDto: CreateTicketDto,
    ) {
        return this.ticketsService.create(+userId, createTicketDto);
    }

    @ApiOperation({ summary: 'Get all tickets' })
    @ApiOkResponse({
        description: 'List of tickets as response',
        type: [Ticket],
    })
    @Get()
    findAll() {
        return this.ticketsService.findAll();
    }

    @ApiOperation({ summary: 'Get ticket by id' })
    @ApiOkResponse({
        description: 'Ticket object as response',
        type: Ticket,
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketsService.findOne(+id);
    }

    @ApiOperation({ summary: 'Update ticket by id' })
    @ApiOkResponse({
        description:
            'Ticket record successfully updated, Ticket object as response',
        type: Ticket,
    })
    @ApiNotFoundResponse({
        description: 'Ticket record with given id does not exist',
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
        return this.ticketsService.update(+id, updateTicketDto);
    }

    @ApiOperation({ summary: 'Delete ticket by id' })
    @ApiOkResponse({
        description: 'DeleteResult object as response',
        type: DeleteResult,
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ticketsService.remove(+id);
    }
}
