import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(@InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>) {}

  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = this.vehicleRepo.create(createVehicleDto);
    return this.vehicleRepo.save(newVehicle);
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepo.find({});
  }

  findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepo.findOneBy({ id_pojazdu: id })
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const currentVehicle = await this.findOne(id);
    if(!currentVehicle) {
      throw new NotFoundException('vehicle not found')
    }
    Object.assign(currentVehicle, updateVehicleDto);
    return this.vehicleRepo.save(currentVehicle);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.vehicleRepo.delete({ id_pojazdu: id });
  }
}
