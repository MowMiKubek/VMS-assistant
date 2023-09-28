import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Cost } from './entities/cost.entity';

@ApiTags('costs')
@Controller('costs')
export class CostsController {
  constructor(private readonly costsService: CostsService) {}

  @ApiOperation({ summary: 'Create a new cost' })
  @ApiCreatedResponse({ description: 'The cost has been successfully created.', type: Cost })
  @ApiParam({ name: 'userid', description: 'The ID of the user who owns the cost.', example: 1 })
  @Post(':userid')
  create(@Param('userid') userId, @Body() createCostDto: CreateCostDto) {
    return this.costsService.create(userId, createCostDto);
  }

  @ApiOperation({ summary: 'Get all costs' })
  @ApiOkResponse({ description: 'All costs have been successfully retrieved.', type: [Cost] })
  @Get()
  findAll() {
    return this.costsService.findAll();
  }

  @ApiOperation({ summary: 'Get a cost by ID' })
  @ApiOkResponse({ description: 'The cost has been successfully retrieved.', type: Cost })
  @ApiParam({ name: 'id', description: 'The ID of the cost to retrieve.', example: 1 })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a cost by ID' })
  @ApiOkResponse({ description: 'The cost has been successfully updated.', type: Cost })
  @ApiParam({ name: 'id', description: 'The ID of the cost to update.', example: 1 })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostDto: UpdateCostDto) {
    return this.costsService.update(+id, updateCostDto);
  }

  @ApiOperation({ summary: 'Delete a cost by ID' })
  @ApiOkResponse({ description: 'The cost has been successfully deleted.' })
  @ApiParam({ name: 'id', description: 'The ID of the cost to delete.', example: 1  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costsService.remove(+id);
  }
}
