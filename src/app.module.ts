import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'development.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(databaseConfig()),
        UserModule,
        VehicleModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
})
export class AppModule {}
