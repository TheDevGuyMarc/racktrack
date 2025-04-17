import { Device } from "src/devices/entities/device.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cable } from "src/cables/entities/cable.entity";

@Entity()
export class Port {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    label: string;

    @Column()
    type: string; // z.b "RJ45", "SFP", "QSFP", etc.

    @Column( { nullable: true } )
    vlan?: string; // z.b "VLAN 10", "VLAN 20", etc.

    @Column( { nullable: true } )
    description?: string; // z.b "Uplink to Switch", "Connection to Router", etc.

    @ManyToOne(() => Device, (device) => device.ports)
    device: Device;

    @OneToMany(() => Cable, (cable) => cable.port_from)
    outgoingCables: Cable[];

    @OneToMany(() => Cable, (cable) => cable.port_to)
    incomingCables: Cable[];

    @OneToMany(() => Comment, (comment) => comment.port)
    comments: Comment[];
}
