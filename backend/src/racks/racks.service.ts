import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRackDto } from './dto/create-rack.dto';
import { UpdateRackDto } from './dto/update-rack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rack } from './entities/rack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RacksService {
  constructor(
    @InjectRepository(Rack)
    private rackRepository: Repository<Rack>,
  ) {}

  async findAll(): Promise<Rack[]> {
    return await this.rackRepository.find({
      relations: ['devices'],
    });
  }

  async findOne(id: string): Promise<Rack> {
    const rack = await this.rackRepository.findOne({
      where: { id },
      relations: ['devices'],
    });

    if (!rack) {
      throw new NotFoundException(`Rack with id ${id} not found`);
    }

    return rack;
  }

  async create(createRackDto: CreateRackDto): Promise<Rack> {
    const rack = await this.rackRepository.create(createRackDto);
    return this.rackRepository.save(rack);
  }

  async update(id: string, updateRackDto: UpdateRackDto): Promise<Rack> {
    const rack = await this.rackRepository.findOne({
      where: { id },
      relations: ['devices'],
    });

    if (!rack) {
      throw new NotFoundException(`Rack with id ${id} not found`);
    }

    Object.assign(rack, updateRackDto);

    return this.rackRepository.save(rack);
  }

  async remove(id: string): Promise<void> {
    const rack = await this.rackRepository.findOne({
      where: { id },
      relations: ['devices'],
    });

    if (!rack) {
      throw new NotFoundException(`Rack with id ${id} not found`);
    }

    await this.rackRepository.remove(rack);
  }
}
