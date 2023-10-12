import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>
  ) {}

  create(id_user: number, createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = this.ticketRepo.create({...createTicketDto, id_user})
    return this.ticketRepo.save(newTicket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({});
  }

  findOne(id_mandatu: number): Promise<Ticket> {
    return this.ticketRepo.findOneBy({ id_mandatu })
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const currentTicket = await this.findOne(id);
    if(!currentTicket) {
      throw new NotFoundException(`ticket with id ${id} not found`);
    }
    Object.assign(currentTicket, updateTicketDto);
    return this.ticketRepo.save(currentTicket);
  }

  remove(id_mandatu: number): Promise<DeleteResult> {
    return this.ticketRepo.delete({ id_mandatu })
  }
}
