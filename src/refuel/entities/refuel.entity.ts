import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { FuelType } from "src/vehicle/fueltype.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tankowania" })
export class Refuel {
    @PrimaryGeneratedColumn()
    id_tankowania: number;

    @ApiProperty({ example: 50.02 })
    @Column({ type: 'decimal' })
    ilosc_paliwa: number;

    @ApiProperty({ example: FuelType.Benzyna })
    @Column({ enum: FuelType })
    typ_paliwa: FuelType;

    @ApiProperty({ example: 649 })
    @Column({ type: 'int' })
    cena_za_litr: number;

    @ApiProperty({ example: 32463 })
    @Column({ type: 'int' })
    cena: number;

    @ApiProperty({ example: 0})
    @Column({ type: 'smallint', default: 0 })
    blokada: number;

    @ApiProperty({ example: 1 })
    @Column({ type: 'int' })
    id_pojazdu: number;
    
    @ManyToOne(() => Vehicle, vehicle => vehicle.tankowania)
    @JoinColumn({ name: 'id_pojazdu' })
    pojazd: Vehicle
}
