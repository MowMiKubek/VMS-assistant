import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FuelType } from "../fueltype.enum";


@Entity({ name: 'pojazdy' })
export class Vehicle {
    @PrimaryGeneratedColumn()
    id_pojazdu: number;

    @Column()
    marka: string;
    
    @Column()
    model: string;
    
    @Column({ type: 'int' })
    rocznik: number;
    
    @Column({ nullable: true })
    VIN: string;

    @Column({ nullable: true })
    nr_rejestracyjny: string;

    @Column({ type: 'date', nullable: true })
    data_pierw_rej: Date;

    @Column({ enum: FuelType })
    typ_paliwa: FuelType;

    @Column({ length: 2 })
    kategoria: string;

    @Column({ nullable: true })
    id_user: number;

    @ManyToOne(() => User, user => user.pojazdy, { nullable: true })
    @JoinColumn({ name: "id_user" })
    user: User;
}
