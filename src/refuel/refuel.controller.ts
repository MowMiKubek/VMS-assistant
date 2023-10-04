import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { RefuelService } from './refuel.service';
import { CreateRefuelDto } from './dto/create-refuel.dto';
import { UpdateRefuelDto } from './dto/update-refuel.dto';
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
import { Refuel } from './entities/refuel.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('refuel')
@Controller('refuel')
export class RefuelController {
    constructor(private readonly refuelService: RefuelService) {}

    @ApiOperation({ summary: 'Create refuel' })
    @ApiCreatedResponse({
        description: 'Refuel record was created, refuel object as response',
        type: Refuel,
    })
    @ApiUnprocessableEntityResponse({
        description: 'Refuel record with given id does not exist',
    })
    @ApiBadRequestResponse({
        description:
            'Incorrect fields in request body, error object as response',
    })
    @ApiParam({
        name: 'vehicleid',
        example: 1,
        description: 'id of vehicle that will have refuel',
    })
    @Post(':vehicleid')
    create(
        @Param('vehicleid') vehicleId: string,
        @Body() createRefuelDto: CreateRefuelDto,
    ) {
        return this.refuelService.create(+vehicleId, createRefuelDto);
    }


    @ApiOperation({ summary: 'Get all refuel records' })
    @ApiOkResponse({
        description: 'List of refuel records as response',
        type: [Refuel],
    })
    @Get()
    findAll() {
        return this.refuelService.findAll();
    }


    @ApiOperation({ summary: 'Get refuel record by id' })
    @ApiOkResponse({
        description: 'Refuel object as response',
        type: Refuel,
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.refuelService.findOne(+id);
    }


    @ApiOperation({ summary: 'Update refuel record' })
    @ApiOkResponse({
        description:
            'Refuel record successfully updated, refuel object as response',
        type: Refuel,
    })
    @ApiNotFoundResponse({
        description: 'Refuel record with given id does not exist',
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRefuelDto: UpdateRefuelDto) {
        return this.refuelService.update(+id, updateRefuelDto);
    }


    @ApiOperation({ summary: 'Delete refuel record' })
    @ApiOkResponse({
      description: 'DeleteResult object as response',
      type: DeleteResult
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.refuelService.remove(+id);
    }
}
