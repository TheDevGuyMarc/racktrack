import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    serial_number: string;

    @IsString()
    @IsNotEmpty()
    manufacturer: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    @IsNotEmpty()
    height_ru: number;

    @IsNumber()
    @IsNotEmpty()
    position_ru: number;

    @IsBoolean()
    @IsNotEmpty()
    front_mounted: boolean;

    @IsUUID()
    @IsNotEmpty()
    rackId: string;

    @IsUUID()
    @IsNotEmpty()
    deviceTypeId: string;
}
