import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefuelService } from './refuel.service';
import { CreateRefuelDto } from './dto/create-refuel.dto';
import { UpdateRefuelDto } from './dto/update-refuel.dto';

@Controller('refuel')
export class RefuelController {
  constructor(private readonly refuelService: RefuelService) {}

  @Post(':vehicleid')
  create(@Param('vehicleid') vehicleId: string, @Body() createRefuelDto: CreateRefuelDto) {
    return this.refuelService.create(+vehicleId, createRefuelDto);
  }

  @Get()
  findAll() {
    return this.refuelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refuelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefuelDto: UpdateRefuelDto) {
    return this.refuelService.update(+id, updateRefuelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refuelService.remove(+id);
  }
}
