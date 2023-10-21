import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Role } from '../auth/role/role.enum';

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

  findByUserId(id_user: number): Promise<Ticket[]> {
    return this.ticketRepo.findBy({ id_user });
  }

  findOne(id_mandatu: number): Promise<Ticket> {
    return this.ticketRepo.findOneBy({ id_mandatu })
  }

  async update(id: number, updateTicketDto: UpdateTicketDto, user: any): Promise<Ticket> {
    const currentTicket = await this.findOne(id);
    if(!currentTicket) {
      throw new NotFoundException(`ticket with id ${id} not found`);
    }
    if(user.role == Role.User && currentTicket.id_user != user.id) 
      throw new ForbiddenException('Forbidden resource');
    Object.assign(currentTicket, updateTicketDto);
    return this.ticketRepo.save(currentTicket);
  }

  async remove(id_mandatu: number, user: any): Promise<DeleteResult> {
    const currentTicket = await this.findOne(id_mandatu);
    if(!currentTicket) {
      throw new NotFoundException(`ticket with ${id_mandatu} not found`);
    }
    if(user.role == Role.User && currentTicket.id_user != user.id) 
      throw new ForbiddenException('Forbidden resource');
    return this.ticketRepo.delete({ id_mandatu })
  }
}
