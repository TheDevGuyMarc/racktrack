import { Device } from "src/devices/entities/device.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rack {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    location?: string;

    @Column()
    height_ru: number;

    @Column()
    width: number;

    @OneToMany(() => Device, (device) => device.rack)
    devices: Device[];
}
