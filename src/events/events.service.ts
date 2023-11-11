import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CarEvent } from './entities/event.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventsService {
  constructor(
    private userService: UserService,
    @InjectRepository(CarEvent) private eventsRepository: Repository<CarEvent>,
    ) {} 

  create(id_pojazdu: number, createEventDto: CreateEventDto) {
    const eventRecord = this.eventsRepository.create({ ...createEventDto, id_pojazdu });
    return this.eventsRepository.save(eventRecord);
  }

  findAll() {
    return this.eventsRepository.find({});
  }

  findOne(id_wydarzenia: number) {
    return this.eventsRepository.findOneBy({ id_wydarzenia });
  }

  async findByUserId(id_user: number) {
    const vehilcles = await this.userService.getVehicles(id_user);
    const ids = vehilcles.map(vehicle => vehicle.id_pojazdu);
    return this.eventsRepository.find({ where: { id_pojazdu: In(ids) } });
  }

  async update(id_wydarzenia: number, updateEventDto: UpdateEventDto) {
    const currentEvent = await this.eventsRepository.findOneBy({ id_wydarzenia });
    if(!currentEvent) {
      throw new NotFoundException(`Event record with id ${id_wydarzenia} not found`);
    }
    Object.assign(currentEvent, updateEventDto);
    return this.eventsRepository.save(currentEvent)
  }

  remove(id_wydarzenia: number) {
    return this.eventsRepository.delete({ id_wydarzenia });
  }
}
