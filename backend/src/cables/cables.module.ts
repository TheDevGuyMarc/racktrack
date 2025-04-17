import { Module } from '@nestjs/common';
import { CablesService } from './cables.service';
import { CablesController } from './cables.controller';

@Module({
  controllers: [CablesController],
  providers: [CablesService],
})
export class CablesModule {}
