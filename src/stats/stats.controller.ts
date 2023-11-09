import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';

@ApiTags('stats')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService) {}

    @Get("/events")
    @ApiOkResponse({ description: 'Get all events stats. Admin role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getEventsStats(): Promise<any> {
        return this.statsService.getEventsStats();
    }

    @Get("/events/:id")
    @ApiOkResponse({ description: 'Get all events stats, for given id of vehicle. Admin role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getEventsStatsForVehicle(@Param("id", ParseIntPipe) id: number): Promise<any> {
        return this.statsService.getEventsStats(id);
    }

    @Get("/refuel")
    @ApiOkResponse({ description: 'Get all refuel stats. Admin role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getRefuelStats(): Promise<any> {
        return this.statsService.getRefuelStats();
    }

    @Get("/refuel/:id")
    @ApiOkResponse({ description: 'Get all refuel stats, for given id of vehicle. Admin role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getRefuelStatsForVehicle(@Param("id", ParseIntPipe) id: number): Promise<any> {
        return this.statsService.getRefuelStats(id);
    }

    @Get("/history")
    @ApiOkResponse({ description: 'Get history of ownership for vehicles. Admin role required' , type: Array})
    @ApiUnauthorizedResponse({ description: 'Token not provided' })
    @ApiForbiddenResponse({ description: 'Insufficient role '})
    getVehicleAssignments(): Promise<any> {
        return this.statsService.getVehicleAssignments();
    }
}
