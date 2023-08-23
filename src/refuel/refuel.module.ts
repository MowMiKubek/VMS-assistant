import { Module } from '@nestjs/common';
import { RefuelService } from './refuel.service';
import { RefuelController } from './refuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Refuel } from './entities/refuel.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Refuel])],
  controllers: [RefuelController],
  providers: [RefuelService, VehicleService],
})
export class RefuelModule {}
