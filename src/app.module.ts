import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { RefuelModule } from './refuel/refuel.module';
import databaseConfig from './database/database.config';

@Module({
  imports: [
    UserModule, 
    ConfigModule.forRoot({
      envFilePath: 'development.env'
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
