import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { RefuelModule } from '../refuel/refuel.module';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [RefuelModule, TypeOrmModule.forFeature([Vehicle, User])],
    controllers: [VehicleController],
    providers: [VehicleService],
})
export class VehicleModule {}
