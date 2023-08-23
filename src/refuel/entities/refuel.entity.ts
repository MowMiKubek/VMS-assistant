import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { FuelType } from "src/vehicle/fueltype.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tankowania" })
export class Refuel {
    @PrimaryGeneratedColumn()
    id_tankowania: number;

    @Column({ type: 'decimal' })
    ilosc_paliwa: number;

    @Column({ enum: FuelType })
    typ_paliwa: FuelType;

    @Column({ type: 'int' })
    cena_za_litr: number;

    @Column({ type: 'int' })
    cena: number;

    @Column({ type: 'smallint', default: 0 })
    blokada: number;

    @Column({ type: 'int' })
    id_pojazdu: number;
    
    @ManyToOne(() => Vehicle, vehicle => vehicle.tankowania)
    @JoinColumn({ name: 'id_pojazdu' })
    pojazd: Vehicle
}
