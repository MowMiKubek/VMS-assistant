import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRefuelDto } from './dto/create-refuel.dto';
import { UpdateRefuelDto } from './dto/update-refuel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Refuel } from './entities/refuel.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class RefuelService {
  constructor(
    @InjectRepository(Refuel) private refuelRepo: Repository<Refuel>,
    private vehicleService: VehicleService,
  ) {}

  async create(id_pojazdu: number, createRefuelDto: CreateRefuelDto): Promise<Refuel> {
    const currentVehicle = await this.vehicleService.findOne(id_pojazdu);
    if(!currentVehicle) {
      throw new NotFoundException(`vehicle with id ${id_pojazdu} not found`)
    }
    const refuelRecord = this.refuelRepo.create({ ...createRefuelDto, id_pojazdu })
    return this.refuelRepo.save(refuelRecord);
  }

  findAll(): Promise<Refuel[]> {
    return this.refuelRepo.find({});
  }

  findOne(id_tankowania: number): Promise<Refuel> {
    return this.refuelRepo.findOneBy({ id_tankowania })
  }

  async update(id_tankowania: number, updateRefuelDto: UpdateRefuelDto): Promise<Refuel> {
    const currentRefuel = await this.refuelRepo.findOneBy({ id_tankowania })
    if(!currentRefuel) {
      throw new NotFoundException(`Refueling record with id ${id_tankowania} not found`)
    }
    Object.assign(currentRefuel, updateRefuelDto);
    return this.refuelRepo.save(currentRefuel);
  }

  remove(id_pojazdu: number): Promise<DeleteResult> {
    return this.refuelRepo.delete({ id_pojazdu });
  }
}
