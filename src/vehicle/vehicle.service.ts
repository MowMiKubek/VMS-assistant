import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Refuel } from '../refuel/entities/refuel.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const newVehicle = this.vehicleRepo.create(createVehicleDto);
        return this.vehicleRepo.save(newVehicle);
    }

    findAll(): Promise<Vehicle[]> {
        return this.vehicleRepo.find({});
    }

    findOne(id: number): Promise<Vehicle> {
        return this.vehicleRepo.findOneBy({ id_pojazdu: id });
    }

    async update(
        id: number,
        updateVehicleDto: UpdateVehicleDto,
    ): Promise<Vehicle> {
        const currentVehicle = await this.findOne(id);
        if (!currentVehicle) {
            throw new NotFoundException('vehicle not found');
        }
        Object.assign(currentVehicle, updateVehicleDto);
        return this.vehicleRepo.save(currentVehicle);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.vehicleRepo.delete({ id_pojazdu: id });
    }

    async getRefuel(id: number): Promise<Refuel[]> {
        const currentVehicle = await this.findOne(id);
        if (!currentVehicle) {
            throw new NotFoundException('vehicle not found');
        }
        const refuelList = await currentVehicle.tankowania;
        return refuelList;
    }

    async assingUserToVehicle(
        id_vehicle: number,
        userId: number,
    ): Promise<Vehicle> {
        // resolve user and vehicle with Promise.all
        const [user, vehicle] = await Promise.all([
            this.userRepo.findOneBy({ id_user: userId }),
            this.vehicleRepo.findOneBy({ id_pojazdu: id_vehicle }),
        ]);
        console.log(user, vehicle);
        // if user or vehicle not found, throw exception
        if (!user || !vehicle) {
            throw new NotFoundException('user or vehicle not found');
        }
        // assign user to vehicle if has permissions or vehicle does not need permissions
        if (
            !vehicle.kategoria ||
            user.permissions.some(
                (user_permission) =>
                    user_permission.kategoria === vehicle.kategoria,
            )
        ) {
            vehicle.id_user = userId;
            return this.vehicleRepo.save(vehicle);
        }
        throw new BadRequestException(
            'user has no permissions to this vehicle',
        );
    }

    async unassingUserFromVehicle(id_vehicle: number): Promise<Vehicle> {
        const vehicle = await this.findOne(id_vehicle);
        if (!vehicle) {
            throw new NotFoundException('vehicle not found');
        }
        vehicle.id_user = null;
        return this.vehicleRepo.save(vehicle);
    }
}
