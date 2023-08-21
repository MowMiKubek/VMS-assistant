import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find({});
  }

  findOne(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id_user: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await this.findOne(id);
    if(!currentUser){
      throw new NotFoundException('user not found');
    }
    Object.assign(currentUser, updateUserDto);
    return this.userRepo.save(currentUser);
  }

  async remove(id: number): Promise<any> {
    return this.userRepo.delete({ id_user: id });
  }
}
