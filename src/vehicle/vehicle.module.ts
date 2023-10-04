import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefuelModule } from '../refuel/refuel.module';
import { EventsModule } from 'src/events/events.module';
import { Vehicle } from './entities/vehicle.entity';
import { User } from '../user/entities/user.entity';
import { Mileage } from './entities/mileage.entity';
import { History } from './entities/history.entity';

@Module({
    imports: [RefuelModule, EventsModule, TypeOrmModule.forFeature([Vehicle, User, Mileage, History])],
    controllers: [VehicleController],
    providers: [VehicleService],
})
export class VehicleModule {}
