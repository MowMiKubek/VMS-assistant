import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'przebiegi' })
export class Mileage {
    @ApiProperty({ description: 'Mileage id' })
    @PrimaryGeneratedColumn()
    id_przebiegu: number;

    @ApiProperty({ description: 'Mileage value'})
    @Column({ type: 'int' })
    stan_licznika: number;

    @ApiProperty({ description: 'Mileage date' })
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    data: Date;

    @ApiProperty({ description: 'Vehicle id' })
    @Column({ type: 'int' })
    id_pojazdu: number;

    @ManyToOne(() => Vehicle, vehicle => vehicle.przebiegi)
    @JoinColumn({ name: 'id_pojazdu' })
    pojazd: Vehicle;
}