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
  // note: vehicleService is for second layer validation, whether refuel record is being registered to existing vehicle
  // there is typeORM exception filter handling those errors so this feature may be removed in te future
})
export class RefuelModule {}
