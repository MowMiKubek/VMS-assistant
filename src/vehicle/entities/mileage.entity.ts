import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity({ name: 'przebiegi' })
export class Mileage {
    @PrimaryGeneratedColumn()
    id_przebiegu: number;

    @Column({ type: 'int' })
    stan_licznika: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    data: Date;

    @Column({ type: 'int' })
    id_pojazdu: number;

    @ManyToOne(() => Vehicle, vehicle => vehicle.przebiegi)
    @JoinColumn({ name: 'id_pojazdu' })
    pojazd: Vehicle;
}