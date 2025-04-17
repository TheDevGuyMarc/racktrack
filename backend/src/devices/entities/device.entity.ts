import { DeviceType } from "src/device-types/entities/device-type.entity";
import { Port } from "src/ports/entities/port.entity";
import { Rack } from "src/racks/entities/rack.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    serial_number: string;

    @Column()
    manufacturer: string;

    @Column()
    type: string;

    @Column()
    height_ru: number;

    @Column()
    position_ru: number;

    @Column()
    front_mounted: boolean;

    @ManyToOne(() => Rack, (rack) => rack.devices)
    rack: Rack;

    @OneToMany(() => Port, (port) => port.device)
    ports: Port[];

    @ManyToOne(() => DeviceType, (deviceType) => deviceType.devices)
    deviceType: DeviceType;
}
