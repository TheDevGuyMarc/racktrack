import { Port } from "src/ports/entities/port.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cable {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    label: string;

    @Column()
    type: string; // z.b "RJ45", "SFP", "QSFP", etc.

    @Column({ nullable: true })
    description?: string; // z.b "Uplink to Switch", "Connection to Router", etc.

    @Column()
    color: string; // z.b "Red", "Blue", "Green", etc.

    @Column()
    length: number; // z.b "1.5m", "2m", "3m", etc.

    @Column()
    length_unit: string; // z.b "m", "cm", "mm", etc.

    @ManyToOne(() => Port, { nullable: false })
    port_from: Port;

    @ManyToOne(() => Port, { nullable: false })
    port_to: Port;
}
