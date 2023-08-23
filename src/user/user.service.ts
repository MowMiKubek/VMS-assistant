import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private userRepo: Repository<User>,
    ) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find({});
  }

  findOne(id_user: number): Promise<User> {
    return this.userRepo.findOneBy({ id_user });
  }

  async update(id_user: number, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await this.findOne(id_user);
    if(!currentUser){
      throw new NotFoundException('user not found');
    }
    Object.assign(currentUser, updateUserDto);
    return this.userRepo.save(currentUser);
  }

  async remove(id_user: number): Promise<DeleteResult> {
    return this.userRepo.delete({ id_user });
  }

  async getVehicles(id_user: number) {
    const user = await this.findOne(id_user);
    if(!user) {
      throw new NotFoundException(`User with id ${id_user} does not exits`);
    }
    const vehicles = await user.pojazdy;
    return vehicles;
  }

  async getTickets(id_user: number) {
    const user = await this.findOne(id_user);
    if(!user) {
      throw new NotFoundException(`User with id ${id_user} does not exits`);
    }
    const tickets = await user.mandaty;
    return tickets;
  }
}
