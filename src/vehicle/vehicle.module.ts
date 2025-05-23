import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { User } from '../user/entities/user.entity';
import { Mileage } from './entities/mileage.entity';
import { History } from './entities/history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle, User, Mileage, History])],
    controllers: [VehicleController],
    providers: [VehicleService],
    exports: [VehicleService]
})
export class VehicleModule {}
