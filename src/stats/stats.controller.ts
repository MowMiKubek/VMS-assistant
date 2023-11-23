import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';
import { CustomDate, QueryDateRange } from './decorators/date.decodator';

@ApiTags('stats')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(Role.Manager)
@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService) {}

    @Get("/events")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all events stats. Manager role required', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getEventsStats(@CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getEventsStats(date.startDate, date.endDate);
    }

    @Get("/events/:id")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all events stats, for given id of vehicle. Manager role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getEventsStatsForVehicle(@Param("id", ParseIntPipe) id: number, @CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getEventsStats(date.startDate, date.endDate, id);
    }

    @Get("/refuel")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all refuel stats. Manager role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getRefuelStats(@CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getRefuelStats(date.startDate, date.endDate);
    }

    @Get("/refuel/:id")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all refuel stats, for given id of vehicle. Manager role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getRefuelStatsForVehicle(@Param("id", ParseIntPipe) id: number, @CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getRefuelStats(date.startDate, date.endDate, id);
    }

    @Get("/tickets/")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all tickets stats. Manager role required', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getTicketsStats(@CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getTicketsStats(date.startDate, date.endDate);
    }

    @Get("/tickets/:id")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all tickets stats. Manager role required', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getTicketsStatsForUser(@Param("id", ParseIntPipe) id: number, @CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getTicketsStats(date.startDate, date.endDate, id);
    }

    @Get("/history")
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get history of ownership for vehicles. Manager role required', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getVehicleAssignments(): Promise<any> {
        return this.statsService.getVehicleAssignments();
    }
}
