import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeviceTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;
}
