import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiCreatedResponse, 
  ApiUnprocessableEntityResponse, 
  ApiBadRequestResponse, 
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/role.guard';
import { Event } from './entities/event.entity';
import { DeleteResult } from 'typeorm';
import { Roles } from '../auth/role/role.decorator';
import { Role } from '../auth/role/role.enum';

@ApiTags('events')
@ApiHeader({ name: 'Authorization', description: 'JWT access token' })
@ApiBearerAuth()
@Controller('events')
@UseGuards(RolesGuard)
@Roles(Role.Manager)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create event' })
  @ApiCreatedResponse({ description: 'Event record was created', type: Event})
  @ApiUnprocessableEntityResponse({ description: 'Car with given id does not exist' })
  @ApiBadRequestResponse({ description: 'Incorrect fields in request body' })
  @ApiParam({ name: 'vehicleid', example: 1, description: 'id of vehicle that will have event' })
  @Post(':vehicleid')
  create(@Param('vehicleid', ParseIntPipe) id: string, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(+id, createEventDto);
  }

  @ApiOperation({ summary: 'Get all event records' })
  @ApiOkResponse({ description: 'List of event records as response', type: [Event] })
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @ApiOperation({ summary: 'Get event record by id' })
  @ApiOkResponse({ description: 'Event record as response', type: Event })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.eventsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update event record by id' })
  @ApiOkResponse({ description: 'Event record as response', type: Event })
  @ApiNotFoundResponse({ description: 'Event record with given id does not exist' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @ApiOperation({ summary: 'Delete event record by id' })
  @ApiOkResponse({ description: 'Event record as response', type: DeleteResult })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.eventsService.remove(+id);
  }
}
