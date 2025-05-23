import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { RefuelModule } from './refuel/refuel.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { CostsModule } from './costs/costs.module';
import databaseConfig from '../database/database.config';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StatsModule } from './stats/stats.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.env.NODE_ENV === 'production' ? '.env' : 'development.env'}`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(databaseConfig()),
        AuthModule,
        UserModule,
        VehicleModule,
        RefuelModule, 
        EventsModule,
        TicketsModule,
        CostsModule,
        StatsModule

    ],
    controllers: [AppController],
    providers: [
        AppService, 
        ConfigService,
        {
            provide: APP_INTERCEPTOR,
            useClass: SerializeInterceptor,
        }
    ],
})
export class AppModule {}
