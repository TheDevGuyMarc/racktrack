import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RacksService } from './racks.service';
import { CreateRackDto } from './dto/create-rack.dto';
import { UpdateRackDto } from './dto/update-rack.dto';

@Controller('racks')
export class RacksController {
  constructor(private readonly racksService: RacksService) {}

  @Get()
  async findAll() {
    return this.racksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.racksService.findOne(id);
  }

  @Post()
  async create(@Body() createRackDto: CreateRackDto) {
    return this.racksService.create(createRackDto);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRackDto: UpdateRackDto) {
    return this.racksService.update(id, updateRackDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.racksService.remove(id);
  }
}
