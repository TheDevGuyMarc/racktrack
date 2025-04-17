import { Module } from '@nestjs/common';
import { RacksService } from './racks.service';
import { RacksController } from './racks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rack } from './entities/rack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rack])], // Add your entities here
  controllers: [RacksController],
  providers: [RacksService],
})
export class RacksModule {}
