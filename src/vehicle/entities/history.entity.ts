import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";
import { User } from "../..//user/entities/user.entity";

@Entity({ name: 'historia'})
export class History {
    @PrimaryGeneratedColumn()
    id_wpis: number;

    @Column({type: 'timestamp'})
    poczatek: Date;

    @Column({type: 'timestamp', nullable: true})
    koniec: Date;

    @Column({type: 'int'})
    id_pojazdu: number;

    @Column({type: 'int'})
    id_user: number;

    @ManyToOne(() => Vehicle, vehicle => vehicle.historia)
    @JoinColumn({ name: 'id_pojazdu' })
    pojazd: Vehicle;

    @ManyToOne(() => User, user => user.historia)
    @JoinColumn({ name: 'id_user' })
    user: User;
}