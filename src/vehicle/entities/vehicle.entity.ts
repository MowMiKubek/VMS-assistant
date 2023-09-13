import { User } from "../..//user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FuelType } from "../fueltype.enum";
import { Refuel } from "../..//refuel/entities/refuel.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: 'pojazdy' })
export class Vehicle {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id_pojazdu: number;

    @ApiProperty({ example: 'volkswagen' })
    @Column()
    marka: string;
    
    @ApiProperty({ example: 'passat' })
    @Column()
    model: string;
    
    @ApiProperty({ example: 2006 })
    @Column({ type: 'int' })
    rocznik: number;
    
    @ApiProperty({ example: '1G1AF1F57A7192174', required: false })
    @Column({ nullable: true })
    VIN: string;

    @ApiProperty({ example: 'DW 9PS69', required: false })
    @Column({ nullable: true })
    nr_rejestracyjny: string;

    @ApiProperty({ example: '2023-08-10T15:00.00Z', required: false })
    @Column({ type: 'date', nullable: true })
    data_pierw_rej: Date;

    @ApiProperty({ example: FuelType.Diesel })
    @Column({ type: "enum", enum: FuelType, default: FuelType.Inne })
    typ_paliwa: FuelType;

    @ApiProperty({ example: 'B', nullable: true })
    @Column({ length: 2, nullable: true })
    kategoria: string;

    @ApiProperty({ example: 1, required: false })
    @Column({ nullable: true })
    id_user: number;

    @ManyToOne(() => User, user => user.pojazdy, { nullable: true })
    @JoinColumn({ name: "id_user" })
    user: User;

    @OneToMany(() => Refuel, refuel => refuel.pojazd)
    tankowania: Promise<Refuel[]>;
}
