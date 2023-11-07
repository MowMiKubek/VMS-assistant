import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stats')
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
