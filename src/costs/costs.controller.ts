import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ForbiddenException } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse, ApiBadRequestResponse, ApiForbiddenResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { Cost } from './entities/cost.entity';
import { Role } from 'src/auth/role/role.enum';

@ApiTags('costs')
@ApiHeader({ name: 'Authorization', description: 'JWT access token' })
@ApiBearerAuth()
@Controller('costs')
export class CostsController {
  constructor(private readonly costsService: CostsService) {}

  @ApiOperation({ summary: 'Create a new cost' })
  @ApiCreatedResponse({ description: 'The cost has been successfully created.', type: Cost })
  @ApiUnprocessableEntityResponse({ description: 'User with given id does not exist' })
  @ApiBadRequestResponse({ description: 'Incorrect fields in request body' })
  @ApiForbiddenResponse({ description: 'Insufficient role. Error when user tries to assign cost to someone else'})
  @ApiParam({ name: 'userid', description: 'The ID of the user who owns the cost.', example: 1, required: false })
  @Post(':userid?')
  create(@Request() req, @Param('userid') userId, @Body() createCostDto: CreateCostDto) {
    if(userId === undefined)
      return this.costsService.create(req.user.id, createCostDto);
    if(req.user.role === Role.Manager || req.user.role === Role.Admin)
    return this.costsService.create(userId, createCostDto);
    throw new ForbiddenException('Insufficient role');
  }

  @ApiOperation({ summary: 'Get all costs' })
  @ApiOkResponse({ description: 'All costs have been successfully retrieved.', type: [Cost] })
  @Get()
  findAll(@Request() req) {
    if(req.user.role === Role.Manager || req.user.role === Role.Admin)
      return this.costsService.findAll();
    return this.costsService.findOneByUserId(req.user.id);
  }

  @ApiOperation({ summary: 'Get a cost by ID' })
  @ApiOkResponse({ description: 'The cost has been successfully retrieved.', type: Cost })
  @ApiParam({ name: 'id', description: 'The ID of the cost to retrieve.', example: 1 })
  @ApiForbiddenResponse({ description: 'Insufficient role. Error when user tries to retrieve cost of someone else'})
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const resultCost = await this.costsService.findOne(+id);
    if(resultCost && req.user.role === Role.User && resultCost.id_user !== req.user.id)
    return this.costsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a cost by ID' })
  @ApiOkResponse({ description: 'The cost has been successfully updated.', type: Cost })
  @ApiParam({ name: 'id', description: 'The ID of the cost to update.', example: 1 })
  @ApiForbiddenResponse({ description: 'Insufficient role. Error when user tries to update cost of someone else'})
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCostDto: UpdateCostDto) {
    return this.costsService.update(+id, updateCostDto, req.user);
  }

  @ApiOperation({ summary: 'Delete a cost by ID' })
  @ApiOkResponse({ description: 'The cost has been successfully deleted.' })
  @ApiParam({ name: 'id', description: 'The ID of the cost to delete.', example: 1  })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.costsService.remove(+id, req.user);
  }
}
