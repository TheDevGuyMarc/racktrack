import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRackDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsNumber()
    @IsNotEmpty()
    height_ru: number;

    @IsNumber()
    @IsNotEmpty()
    width: number;
}
