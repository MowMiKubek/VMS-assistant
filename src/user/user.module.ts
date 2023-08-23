import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TicketsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
