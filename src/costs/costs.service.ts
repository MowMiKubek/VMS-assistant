import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cost } from './entities/cost.entity';
import { Repository } from 'typeorm';

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

  findOne(id_kosztu: number) {
    return this.costRepo.findOneBy({ id_kosztu });
  }

  async update(id_kosztu: number, updateCostDto: UpdateCostDto) {
    // return this.costRepo.update({ id_kosztu }, updateCostDto);
    const currentCost = await this.costRepo.findOneBy({ id_kosztu });
    if(!currentCost) {
      throw new NotFoundException(`Cost record with id ${id_kosztu} not found`);
    }
    Object.assign(currentCost, updateCostDto);
    return this.costRepo.save(currentCost);
  }

  remove(id_kosztu: number) {
    this.costRepo.delete({ id_kosztu });
  }
}
