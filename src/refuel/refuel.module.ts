import { Module } from '@nestjs/common';
import { RefuelService } from './refuel.service';
import { RefuelController } from './refuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Refuel } from './entities/refuel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Refuel])],
  controllers: [RefuelController],
  providers: [RefuelService], 
})
export class RefuelModule {}
