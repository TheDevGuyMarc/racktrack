import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceType } from './entities/device-type.entity';

@Injectable()
export class DeviceTypesService {
  constructor(
    @InjectRepository(DeviceType)
    private readonly deviceTypeRepository: Repository<DeviceType>,
  ) {}

  async findAll(): Promise<DeviceType[]> {
    return this.deviceTypeRepository.find({
      relations: ['devices'],
    });
  }

  async findOne(id: string): Promise<DeviceType> {
    const deviceType = await this.deviceTypeRepository.findOne({
      where: { id },
      relations: ['devices'],
    });

    if (!deviceType) {
      throw new NotFoundException(`DeviceType with id ${id} not found`);
    }

    return deviceType;
  }

  async create(createDeviceTypeDto: CreateDeviceTypeDto): Promise<DeviceType> {
    const deviceType = await this.deviceTypeRepository.create(createDeviceTypeDto);
    return await this.deviceTypeRepository.save(deviceType);
  }

  async update(id: string, updateDeviceTypeDto: UpdateDeviceTypeDto): Promise<DeviceType> {
    const deviceType = await this.deviceTypeRepository.findOne({
      where: { id },
      relations: ['devices'],
    });

    if (!deviceType) {
      throw new NotFoundException(`DeviceType with id ${id} not found`);
    }

    Object.assign(deviceType, updateDeviceTypeDto);

    return this.deviceTypeRepository.save(deviceType);
  }

  async remove(id: string): Promise<void> {
    const deviceType = await this.deviceTypeRepository.findOne({
      where: { id },
      relations: ['devices'],
    });

    if (!deviceType) {
      throw new NotFoundException(`DeviceType with id ${id} not found`);
    }

    await this.deviceTypeRepository.remove(deviceType);
  }
}
