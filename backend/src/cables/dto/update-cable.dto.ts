import { PartialType } from '@nestjs/mapped-types';
import { CreateCableDto } from './create-cable.dto';

export class UpdateCableDto extends PartialType(CreateCableDto) {}
