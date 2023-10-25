import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    ForbiddenException,
    NotFoundException,
    ParseIntPipe
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/role/role.enum';

import { Vehicle } from './entities/vehicle.entity';
import { Refuel } from '../refuel/entities/refuel.entity';
import { Mileage } from './entities/mileage.entity';
import { CreateMileageDto } from './dto/create-mileage.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from '../auth/role/role.decorator';

@ApiTags('vehicle')
@ApiHeader({ name: 'Authorization', description: 'JWT access token'})
@ApiBearerAuth()
@Controller('vehicle')
@UseGuards(RolesGuard)
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @ApiOperation({ summary: 'Create vehicle, Admin role required' })
    @ApiCreatedResponse({ description: 'Vehicle was created, vehicle object as response', type: Vehicle })
    @ApiBadRequestResponse({
        description: 'Incorrect fields in request body, error object (fields: message, error, statusCode) as response' })
    @ApiUnprocessableEntityResponse({
        description: 'Integrity error from database, violation of eighter duplicate or foreign key constraint, error object as response',
    })
    @Roles(Role.Admin)
    @Post()
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehicleService.create(createVehicleDto);
    }

    @ApiOperation({ summary: 'Get all vehicles' })
    @ApiOkResponse({ description: 'List of vehicles as response', type: [Vehicle] })
    // @Roles(Role.Manager)
    @Get()
    findAll(@Request() req) {
        if(req.user.role === Role.User)
            return this.vehicleService.findAllByUser(req.user.id);
        return this.vehicleService.findAll();
    }

    @ApiOperation({ summary: 'Get vehicle by id' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'Vehicle object or empty object as response', type: Vehicle })
    @ApiForbiddenResponse({ description: 'User does not have access to vehicle' })
    @Get(':id')
    async findOne(@Request() req, @Param('id', ParseIntPipe) id: string) {
        const vehicle = await this.vehicleService.findOne(+id);
        if(!vehicle)
            throw new NotFoundException('Vehicle not found');
        if(req.user.role === Role.User && vehicle.id_user != req.user.id) 
            throw new ForbiddenException('Forbidden resource');
        return vehicle;
    }


    @ApiOperation({ summary: 'Get vehicle by id. Manager route required' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'list mileage records of the vehicle', type: [Mileage] })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Roles(Role.Manager)
    @Get(':id/mileage')
    async getMileage(@Param('id', ParseIntPipe) id: string) {
        return this.vehicleService.getMileageList(+id);
    }

    @ApiOperation({ summary: 'Get latest mileage record of the vehicle' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'latest mileage record of the vehicle or empty object if no record is present', type: Mileage })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @ApiForbiddenResponse({ description: 'User does not have access to vehicle' })
    @Get(':id/mileage/latest')
    async getLatestMileage(@Request() req, @Param('id', ParseIntPipe) id: string) {
        const vehicleModifyAccess = await this.vehicleService.checkIfUserCanAccessVehicle(+id, req.user);
        if(!vehicleModifyAccess) 
            throw new ForbiddenException('Forbidden resource');
        return this.vehicleService.getLatestMileage(+id);
    }

    @ApiOperation({ summary: 'Create mileage record for the vehicle'})
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiCreatedResponse({ description: 'mileage record created successfully, mileage object as response', type: Mileage })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @ApiForbiddenResponse({ description: 'User does not have access to vehicle' })
    @Post(':id/mileage')
    async addMileage(@Request() req, @Param('id', ParseIntPipe) id: string, @Body() mileage: CreateMileageDto) {
        const vehicleModifyAccess = await this.vehicleService.checkIfUserCanAccessVehicle(+id, req.user);
        if(!vehicleModifyAccess) 
            throw new ForbiddenException('Forbidden resource');
        return this.vehicleService.addMileage(+id, mileage);
    }


    @ApiOperation({ summary: 'Delete mileage record of the vehicle. Manager route required' })
    @ApiParam({ name: 'mileageid', example: 1, description: 'id of mileage record' })
    @ApiOkResponse({ description: 'mileage record deleted successfully, DeleteResult object as response', type: DeleteResult })
    @Delete('mileage/:mileageid')
    @Roles(Role.Manager)
    deleteMileage(@Param('mileageid', ParseIntPipe) mileageid: string) {
        return this.vehicleService.deleteMileage(+mileageid);
    }


    @ApiOperation({ summary: 'Get refuel records of the vehicle' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'list refuel record of the vehicle', type: [Refuel] })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @ApiForbiddenResponse({ description: 'User does not have access to vehicle' })
    @Get(':id/refuel')
    async getRefuel(@Request() req, @Param('id', ParseIntPipe) id: string) {
        const vehicleModifyAccess = await this.vehicleService.checkIfUserCanAccessVehicle(+id, req.user);
        if(!vehicleModifyAccess) 
            throw new ForbiddenException('Forbidden resource');
        return this.vehicleService.getRefuel(+id);
    }

    @ApiOperation({ summary: 'Get event list of the vehicle' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'list events associated the vehicle', type: [Event] })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Get(':id/events')
    @Roles(Role.Manager)
    getEvents(@Param('id', ParseIntPipe) id: string) {
        return this.vehicleService.getEvents(+id);
    }

    @ApiOperation({ summary: 'Create refuel record for the vehicle. Admin role required' })
    @ApiOkResponse({ description: 'vehicle updated successfully, user object as response', type: Vehicle })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Patch(':id')
    @Roles(Role.Admin)
    update(
        @Param('id', ParseIntPipe) id: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return this.vehicleService.update(+id, updateVehicleDto);
    }
    

    @ApiOperation({ summary: 'Delete vehicle by id, Admin role required' })
    @ApiOkResponse({ description: 'Object contaning field "affected", which is number of removed records' })
    @Delete(':id')
    @Roles(Role.Admin)
    remove(@Param('id', ParseIntPipe) id: string) {
        return this.vehicleService.remove(+id);
    }


    @ApiOperation({ summary: 'Assign vehicle to user. Manager role required' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiParam({ name: 'userid', example: 1, description: 'id of user' })
    @ApiOkResponse({ description: 'vehicle updated successfully, vehicle object as response', type: Vehicle })
    @ApiNotFoundResponse({ description: 'vehicle or user with given id does not exist' })
    @ApiBadRequestResponse({ description: 'user does not have driving permission to given vehicle' })
    @Roles(Role.Manager)
    @Patch(':id/assign/:userid')
    assignVehicle(@Param('id', ParseIntPipe) id: string, @Param('userid', ParseIntPipe) userid: string) {
        return this.vehicleService.assingUserToVehicle(+id, +userid);
    }


    @ApiOperation({ summary: 'Unassign vehicle from user. Manager role required' })
    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle that will have owner removed' })
    @ApiOkResponse({ description: 'vehicle owner unassigned (set to null), vehicle object as response', type: Vehicle })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Roles(Role.Manager)
    @Delete(':id/assign')
    unassignVehicle(@Param('id', ParseIntPipe) id: string) {
        return this.vehicleService.unassingUserFromVehicle(+id);
    }
}
