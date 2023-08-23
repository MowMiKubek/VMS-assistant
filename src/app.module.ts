import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { RefuelModule } from './refuel/refuel.module';
import databaseConfig from './database/database.config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from './vehicle/filters/typeorm-exception.filter';

// TODO
// check whether its necessary to pass multiple entities to TypeOrm.forFreature in modules


@Module({
  imports: [
    UserModule, 
    ConfigModule.forRoot({
      envFilePath: 'development.env'
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    VehicleModule,
    RefuelModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, 
      {
        provide: APP_FILTER,
        useClass: TypeOrmExceptionFilter
      }
  ],
})
export class AppModule {}
