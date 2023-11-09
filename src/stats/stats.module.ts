import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEvent } from 'src/events/entities/event.entity';
import { Refuel } from 'src/refuel/entities/refuel.entity';
import { History } from 'src/vehicle/entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEvent, Refuel, History])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
