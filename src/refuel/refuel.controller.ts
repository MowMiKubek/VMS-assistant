import {
    Controller,
    ForbiddenException,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Req,
    Delete,
    UseGuards,
    NotFoundException,
    ParseIntPipe
} from '@nestjs/common';
import { RefuelService } from './refuel.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { CreateRefuelDto } from './dto/create-refuel.dto';
import { UpdateRefuelDto } from './dto/update-refuel.dto';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Refuel } from './entities/refuel.entity';
import { DeleteResult } from 'typeorm';
import { Role } from '../auth/role/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/role.decorator';

@ApiTags('refuel')
@ApiHeader({ name: 'Authorization', description: 'JWT access token' })
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('refuel')
export class RefuelController {
    constructor(
        private readonly refuelService: RefuelService,
        private readonly vehicleService: VehicleService,
        ) {}

    @ApiOperation({ summary: 'Create refuel' })
    @ApiCreatedResponse({ description: 'Refuel record was created, refuel object as response', type: Refuel })
    @ApiUnprocessableEntityResponse({ description: 'Refuel record with given id does not exist' })
    @ApiBadRequestResponse({ description: 'Incorrect fields in request body, error object as response' })
    @ApiParam({ name: 'vehicleid', example: 1, required: false, description: 'id of vehicle that will have refuel' })
    @Post(':vehicleid')
    async create(@Req() req, @Body() createRefuelDto: CreateRefuelDto, @Param('vehicleid', ParseIntPipe) vehicleId: string) {
        const canUserModifyVehicle = await this.vehicleService.checkIfUserCanAccessVehicle(+vehicleId, req.user);
        if(canUserModifyVehicle)
            return this.refuelService.create(+vehicleId, createRefuelDto);
        throw new ForbiddenException('Forbidden resource');
    }

    @ApiOperation({ summary: 'Get all refuel records. Required manager role' })
    @ApiOkResponse({ description: 'List of refuel records as response', type: [Refuel] })
    @Roles(Role.Manager)
    @Get()
    findAll() {
        return this.refuelService.findAll();
    }

    @ApiOperation({ summary: 'Get refuel record by id' })
    @ApiOkResponse({ description: 'Refuel object as response', type: Refuel})
    @Get(':id')
    async findOne(@Req() req, @Param('id', ParseIntPipe) id: string) {
        const refuel = await this.refuelService.findOne(+id);
        if(!refuel)
            throw new NotFoundException("Refuel record with given id does not exist");
        const canUserModifyVehicle = await this.vehicleService.checkIfUserCanAccessVehicle(refuel.id_pojazdu, req.user);
        if(canUserModifyVehicle)
            return refuel;
        throw new ForbiddenException('Forbidden resource');
    }

    @ApiOperation({ summary: 'Update refuel record' })
    @ApiOkResponse({ description: 'Refuel record successfully updated, refuel object as response', type: Refuel})
    @ApiNotFoundResponse({ description: 'Refuel record with given id does not exist' })
    @Patch(':id')
    async update(@Req() req, @Param('id', ParseIntPipe) id: string, @Body() updateRefuelDto: UpdateRefuelDto) {
        const refuel = await this.refuelService.findOne(+id);
        if(!refuel)
            throw new NotFoundException("Refuel record with given id does not exist");
        const canUserModifyVehicle = await this.vehicleService.checkIfUserCanAccessVehicle(refuel.id_pojazdu, req.user);
        if(canUserModifyVehicle)
            return this.refuelService.update(+id, updateRefuelDto);
        throw new ForbiddenException('Forbidden resource');
    }

    @ApiOperation({ summary: 'Delete refuel record' })
    @ApiOkResponse({ description: 'DeleteResult object as response', type: DeleteResult })
    @Delete(':id')
    async remove(@Req() req, @Param('id', ParseIntPipe) id: string) {
        const refuel = await this.refuelService.findOne(+id);
        if(!refuel)
            throw new NotFoundException("Refuel record with given id does not exist");
        const canUserModifyVehicle = await this.vehicleService.checkIfUserCanAccessVehicle(refuel.id_pojazdu, req.user);
        if(canUserModifyVehicle)
            return this.refuelService.remove(+id);
        throw new ForbiddenException('Forbidden resource');
    }
}
