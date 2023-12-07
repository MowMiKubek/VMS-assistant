import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEvent } from 'src/events/entities/event.entity';
import { Refuel } from 'src/refuel/entities/refuel.entity';
import { History } from 'src/vehicle/entities/history.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StatsInterceptor } from 'src/interceptors/stats.interceptor';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { Cost } from 'src/costs/entities/cost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEvent, Refuel, History, Ticket, Cost]), VehicleModule],
  controllers: [StatsController],
  providers: [StatsService, { provide: APP_INTERCEPTOR, useClass: StatsInterceptor }]
})
export class StatsModule {}
