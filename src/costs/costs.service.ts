import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cost } from './entities/cost.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/role/role.enum';

@Injectable()
export class CostsService {
  constructor(@InjectRepository(Cost) private costRepo: Repository<Cost>) {}

  create(id_user: number, createCostDto: CreateCostDto) {
    const newCost = this.costRepo.create({ ...createCostDto, id_user });
    return this.costRepo.save(newCost);
  }

  findAll() {
    return this.costRepo.find({});
  }

  findOneByUserId(id_user: number) {
    return this.costRepo.findOneBy({ id_user });
  }

  findOne(id_kosztu: number) {
    return this.costRepo.findOneBy({ id_kosztu });
  }

  async update(id_kosztu: number, updateCostDto: UpdateCostDto, user: any): Promise<Cost> {
    const currentCost = await this.costRepo.findOneBy({ id_kosztu });
    if(!currentCost) {
      throw new NotFoundException(`Cost record with id ${id_kosztu} not found`);
    }
    if(user.role == Role.User && currentCost.id_user != user.id)
      throw new ForbiddenException('Forbidden resource');
    Object.assign(currentCost, updateCostDto);
    return this.costRepo.save(currentCost);
  }

  async remove(id_kosztu: number, user: any) {
    const currentTicket = await this.findOne(id_kosztu);
    if(currentTicket && user.role == Role.User && currentTicket.id_user != user.id)
      throw new ForbiddenException('Forbidden resource');
    this.costRepo.delete({ id_kosztu });
  }
}
