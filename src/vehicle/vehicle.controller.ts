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
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';
import { Refuel } from 'src/refuel/entities/refuel.entity';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

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

    @ApiOkResponse({
      description: 'List of vehicles as response', type: [Vehicle]
    })
    @Get()
    findAll() {
        return this.vehicleService.findAll();
    }

    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'Vehicle object or empty object as response', type: Vehicle })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehicleService.findOne(+id);
    }

    @ApiParam({ name: 'id', example: 1, description: 'id of vehicle' })
    @ApiOkResponse({ description: 'list refuel record of the vehicle', type: [Refuel] })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Get(':id/refuel')
    getRefuel(@Param('id') id: string) {
        return this.vehicleService.getRefuel(+id);
    }

    @ApiOkResponse({ description: 'vehicle updated successfully, user object as response', type: Vehicle })
    @ApiNotFoundResponse({ description: 'vehicle with given id does not exist' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return this.vehicleService.update(+id, updateVehicleDto);
    }
    
    @ApiOkResponse({ description: 'Object contaning field "affected", which is number of removed records' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehicleService.remove(+id);
    }
}
