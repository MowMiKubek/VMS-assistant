import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
    getEventsStats(): Promise<any> {
        return this.statsService.getEventsStats();
    }

    @Get("/events/:id")
    getEventsStatsForVehicle(@Param("id", ParseIntPipe) id: number): Promise<any> {
        return this.statsService.getEventsStats(id);
    }

    @Get("/refuel")
    getRefuelStats(): Promise<any> {
        return this.statsService.getRefuelStats();
    }

    @Get("/refuel/:id")
    getRefuelStatsForVehicle(@Param("id", ParseIntPipe) id: number): Promise<any> {
        return this.statsService.getRefuelStats(id);
    }

    @Get("/history")
    getVehicleAssignments(): Promise<any> {
        return this.statsService.getVehicleAssignments();
    }
}
