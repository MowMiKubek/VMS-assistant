import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { Permission } from './entities/permissions.entity';
import { CostsModule } from 'src/costs/costs.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission]), TicketsModule, CostsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
