import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "../../vehicle/entities/vehicle.entity";
import { FuelType } from "../../vehicle/fueltype.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tankowania" })
export class Refuel {
    @PrimaryGeneratedColumn()
    id_tankowania: number;

    @ApiProperty({ example: 50.02 })
    @Column({ type: 'decimal' })
    ilosc_paliwa: number;

    @ApiProperty({ example: FuelType.Benzyna })
    @Column({ type: "enum", enum: FuelType, default: FuelType.Inne })
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

    @ApiProperty({ example: '2021-05-01T12:00:00' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data: Date;

    @ApiProperty({ example: 1 })
    @Column({ type: 'int' })
    id_pojazdu: number;
    
    @ManyToOne(() => Vehicle, vehicle => vehicle.tankowania)
    @JoinColumn({ name: 'id_pojazdu' })
    pojazd: Vehicle
}
