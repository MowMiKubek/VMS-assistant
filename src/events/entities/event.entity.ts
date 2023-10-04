import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'wydarzenia' })
export class Event {
    @PrimaryGeneratedColumn()
    id_wydarzenia: number;

    @ApiProperty({ example: 'Przegląd' })
    @Column({ type: 'varchar', length: 20})
    nazwa: string;
    
    @ApiProperty({ example: 'Przegląd techniczny samochodu' })
    @Column({ type: 'text'})
    opis: string;
    
    @ApiProperty({ example: '2023-08-10T15:00.00Z' })
    @Column({ type: 'datetime' })
    data: Date;
    
    @ApiProperty({ example: 10000 })
    @Column({ type: 'int' })
    koszt: number;
    
    @ApiProperty({ example: 1 })
    @Column({ type: 'tinyint', default: 0 })
    czy_przypomniec: number;
    
    @ApiProperty({ example: 1 })
    @Column({ type: 'tinyint', default: 0 })
    czy_okresowe: number;
    
    @ApiProperty({ example: 12 })
    @Column({ type: 'int', nullable: true })
    okres: number;

    @ApiProperty({ example: 1 })
    @Column({ type: 'int'})
    id_pojazdu: number;

    // relations
    @ManyToOne(() => Vehicle, vehilcle => vehilcle.wydarzenia )
    @JoinColumn({ name: "id_pojazdu" })
    pojazd: Vehicle;
}
