import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacksModule } from './racks/racks.module';
import { DevicesModule } from './devices/devices.module';
import { PortsModule } from './ports/ports.module';
import { CommentsModule } from './comments/comments.module';
import { CablesModule } from './cables/cables.module';
import { DeviceTypesModule } from './device-types/device-types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.DB_USER || 'rackadmin',
      password: process.env.DB_PASSWORD || 'rackpass',
      database: process.env.DB_NAME || 'rackdb',
      autoLoadEntities: true,
      synchronize: true, // später auf false und Migrations verwenden
      logging: true,
    }),
    RacksModule,
    DevicesModule,
    PortsModule,
    CommentsModule,
    CablesModule,
    DeviceTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
