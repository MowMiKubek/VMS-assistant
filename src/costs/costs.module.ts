import { Module } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cost } from './entities/cost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cost])],
  controllers: [CostsController],
  providers: [CostsService],
})
export class CostsModule {}
