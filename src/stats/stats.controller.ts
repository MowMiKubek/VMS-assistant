import { BadRequestException, Controller, ForbiddenException, Get, NotFoundException, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';
import { CustomDate, QueryDateRange } from './decorators/date.decodator';
import { VehicleService } from 'src/vehicle/vehicle.service';

@ApiTags('stats')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('stats')
export class StatsController {
    constructor(
        private statsService: StatsService, 
        private vehicleService: VehicleService ) {}

    @Get("/events")
    @Roles(Role.Manager)
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
    @ApiOkResponse({ description: 'Get events stats, for given id of vehicle' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    async getEventsStatsForVehicle(@Req() request, @Param("id", ParseIntPipe) id: number, @CustomDate() date: QueryDateRange): Promise<any> {
        const vehicleAccess = await this.vehicleService.checkIfUserCanAccessVehicle(id, request.user);
        if(!vehicleAccess) {
            throw new ForbiddenException("You cannot access this vehicle");
        }
        return this.statsService.getEventsStats(date.startDate, date.endDate, id);
    }

    @Get("/refuel")
    @Roles(Role.Manager)
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
    @ApiOkResponse({ description: 'Get refuel stats, for given id of vehicle' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    async getRefuelStatsForVehicle(@Req() request, @Param("id", ParseIntPipe) id: number, @CustomDate() date: QueryDateRange): Promise<any> {
        const vehicleAccess = await this.vehicleService.checkIfUserCanAccessVehicle(id, request.user);
        if(!vehicleAccess) {
            throw new ForbiddenException("You cannot access this vehicle");
        }
        return this.statsService.getRefuelStats(date.startDate, date.endDate, id);
    }

    @Get("/tickets/")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all tickets stats. Manager role required', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getTicketsStats(@Req() request, @CustomDate() date: QueryDateRange): Promise<any> {
        if(request.user.role === Role.User)
            return this.statsService.getTicketsStats(date.startDate, date.endDate, request.user.id);
        return this.statsService.getTicketsStats(date.startDate, date.endDate);
    }

    @Get("/tickets/:id")
    @Roles(Role.Manager)
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get ticket stats for given user', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    async getTicketsStatsForUser(@Param("id", ParseIntPipe) id: number, @CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getTicketsStats(date.startDate, date.endDate, id);
    }

    @Get("/costs/")
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get all costs stats. Manager role required', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getCostsStats(@Req() request, @CustomDate() date: QueryDateRange): Promise<any> {
        if(request.user.role === Role.User)
            return this.statsService.getCostsStats(date.startDate, date.endDate, request.user.id);
        return this.statsService.getCostsStats(date.startDate, date.endDate);
    }

    @Get("/costs/:id")
    @Roles(Role.Manager)
    @ApiQuery({ name: 'start', required: false, type: String })
    @ApiQuery({ name: 'end', required: false, type: String })
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get costs stats for given user', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    async getCostsStatsForUser(@Param("id", ParseIntPipe) id: number, @CustomDate() date: QueryDateRange): Promise<any> {
        return this.statsService.getCostsStats(date.startDate, date.endDate, id);
    }

    @Get("/history")
    @Roles(Role.Manager)
    @ApiQuery({ name: 'export', required: false, type: String })
    @ApiOkResponse({ description: 'Get history of ownership for vehicles. Manager role required', type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getVehicleAssignments(): Promise<any> {
        return this.statsService.getVehicleAssignments();
    }
}
