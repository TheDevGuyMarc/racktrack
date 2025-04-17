import { Injectable } from '@nestjs/common';
import { CreateCableDto } from './dto/create-cable.dto';
import { UpdateCableDto } from './dto/update-cable.dto';

@Injectable()
export class CablesService {
  create(createCableDto: CreateCableDto) {
    return 'This action adds a new cable';
  }

  findAll() {
    return `This action returns all cables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cable`;
  }

  update(id: number, updateCableDto: UpdateCableDto) {
    return `This action updates a #${id} cable`;
  }

  remove(id: number) {
    return `This action removes a #${id} cable`;
  }
}
