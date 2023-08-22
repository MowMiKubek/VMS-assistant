import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Vehicle])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
