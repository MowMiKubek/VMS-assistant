import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { Vehicle } from './entities/vehicle.entity';
import { Refuel } from '../refuel/entities/refuel.entity';
import { Mileage } from './entities/mileage.entity';
import { CreateMileageDto } from './dto/create-mileage.dto';
import { DeleteResult } from 'typeorm';


@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @ApiOperation({ summary: 'Create vehicle' })
    @ApiCreatedResponse({
        description: 'Vehicle was created, vehicle object as response', type: Vehicle
    })
    @ApiBadRequestResponse({
        description:
            'Incorrect fields in request body, error object (fields: message, error, statusCode) as response',
    })
    @ApiUnprocessableEntityResponse({
        description:
            'Integrity error from database, violation of eighter duplicate or foreign key constraint, error object as response',
    })
    @Post()
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehicleService.create(createVehicleDto);
    }

    @ApiOperation({ summary: 'Get all vehicles' })
    @ApiOkResponse({
      description: 'List of vehicles as response', type: [Vehicle]
    })
    @Get()
    findAll() {
        return this.vehicleService.findAll();
    }

    @ApiOperation({ summary: 'Get vehicle by id' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'Vehicle object or empty object as response', type: Vehicle })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehicleService.findOne(+id);
    }


    @ApiOperation({ summary: 'Get vehicle by id' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'list mileage records of the vehicle', type: [Mileage] })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Get(':id/mileage')
    getMileage(@Param('id') id: string) {
        return this.vehicleService.getMileageList(+id);
    }

    @ApiOperation({ summary: 'Get latest mileage record of the vehicle' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'latest mileage record of the vehicle or empty object if no record is present', type: Mileage })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Get(':id/mileage/latest')
    getLatestMileage(@Param('id') id: string) {
        return this.vehicleService.getLatestMileage(+id);
    }

    @ApiOperation({ summary: 'Create mileage record for the vehicle' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'mileage record created successfully, mileage object as response', type: Mileage })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Post(':id/mileage')
    addMileage(@Param('id') id: string, @Body() mileage: CreateMileageDto) {
        return this.vehicleService.addMileage(+id, mileage);
    }


    @ApiOperation({ summary: 'Delete mileage record of the vehicle' })
    @ApiParam({ name: 'mileageId', example: 1, description: 'id of mileage record' })
    @ApiOkResponse({ description: 'mileage record deleted successfully, DeleteResult object as response', type: DeleteResult })
    @Delete('mileage/:mileageId')
    deleteMileage(@Param('mileageId') mileageId: string) {
        return this.vehicleService.deleteMileage(+mileageId);
    }


    @ApiOperation({ summary: 'Get refuel records of the vehicle' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'list refuel record of the vehicle', type: [Refuel] })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Get(':id/refuel')
    getRefuel(@Param('id') id: string) {
        return this.vehicleService.getRefuel(+id);
    }


    @ApiOperation({ summary: 'Create refuel record for the vehicle' })
    @ApiOkResponse({ description: 'vehicle updated successfully, user object as response', type: Vehicle })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return this.vehicleService.update(+id, updateVehicleDto);
    }
    

    @ApiOperation({ summary: 'Delete vehicle by id' })
    @ApiOkResponse({ description: 'Object contaning field "affected", which is number of removed records' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehicleService.remove(+id);
    }


    @ApiOperation({ summary: 'Assign vehicle to user' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiParam({ name: 'userId', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'vehicle updated successfully, vehicle object as response', type: Vehicle })
    @ApiNotFoundResponse({ description: 'vehicle or user with given id does not exist' })
    @ApiBadRequestResponse({ description: 'user does not have driving permission to given vehicle' })
    @Patch(':id/assign/:userId')
    assignVehicle(@Param('id') id: string, @Param('userId') userId: string) {
        return this.vehicleService.assingUserToVehicle(+id, +userId);
    }


    @ApiOperation({ summary: 'Unassign vehicle from user' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle that will have owner removed' })
    @ApiOkResponse({ description: 'vehicle owner unassigned (set to null), vehicle object as response', type: Vehicle })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Delete(':id/assign')
    unassignVehicle(@Param('id') id: string) {
        return this.vehicleService.unassingUserFromVehicle(+id);
    }
}
