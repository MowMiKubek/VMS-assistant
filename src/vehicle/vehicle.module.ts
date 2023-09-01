import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { RefuelModule } from '../refuel/refuel.module';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle]), RefuelModule],
    controllers: [VehicleController],
    providers: [VehicleService],
})
export class VehicleModule {}
