import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CablesService } from './cables.service';
import { CreateCableDto } from './dto/create-cable.dto';
import { UpdateCableDto } from './dto/update-cable.dto';

@Controller('cables')
export class CablesController {
  constructor(private readonly cablesService: CablesService) {}

  @Post()
  create(@Body() createCableDto: CreateCableDto) {
    return this.cablesService.create(createCableDto);
  }

  @Get()
  findAll() {
    return this.cablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCableDto: UpdateCableDto) {
    return this.cablesService.update(+id, updateCableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cablesService.remove(+id);
  }
}
