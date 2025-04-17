import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';
import { Rack } from 'src/racks/entities/rack.entity';
import { DeviceType } from 'src/device-types/entities/device-type.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(Rack)
    private readonly rackRepository: Repository<Rack>,
    @InjectRepository(DeviceType)
    private readonly deviceTypeRepository: Repository<DeviceType>,
  ) {}

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.find({
      relations: ['rack', 'ports', 'deviceType'],
    });
  }

  async findOne(id: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: ['rack', 'ports', 'deviceType'],
    });

    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }

    return device;
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const rack = await this.rackRepository.findOne({
      where: { id: createDeviceDto.rackId },
      relations: ['devices'],
    });

    if (!rack) {
      throw new NotFoundException(`Rack with id ${createDeviceDto.rackId} not found`);
    }

    const deviceType = await this.deviceTypeRepository.findOne({
      where: { id: createDeviceDto.deviceTypeId },
    });

    if (!deviceType) {
      throw new NotFoundException(`DeviceType with id ${createDeviceDto.deviceTypeId} not found`);
    }

    // Check auf belegte Einheiten
    const blockedUnits = rack.devices.flatMap((d) =>
      Array.from({ length: d.height_ru }, (_, i) => d.position_ru + i)
    );
  
    const newDeviceUnits = Array.from({ length: createDeviceDto.height_ru }, (_, i) => createDeviceDto.position_ru + i);
    const collision = newDeviceUnits.some((unit) => blockedUnits.includes(unit));
  
    if (collision) {
      throw new BadRequestException('Rack position is already occupied by another device. Please choose a different position.');
    }

    const device = await this.deviceRepository.create({
      ...createDeviceDto,
      rack,
      deviceType,
    });

    return this.deviceRepository.save(device);
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: ['rack', 'ports'],
    });

    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }

    Object.assign(device, updateDeviceDto);

    return this.deviceRepository.save(device);
  }

  async remove(id: string): Promise<void> {
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: ['rack', 'ports'],
    });

    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }

    await this.deviceRepository.remove(device);
  }
}
