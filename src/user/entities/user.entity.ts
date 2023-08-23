import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Role } from "../role.enum";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ length: 50 })
    imie: string;

    @Column({ length: 50 })
    nazwisko: string;

    @Column({ length: 45 })
    email: string;

    @Column({ length: 45 })
    login: string;

    @Column('text')
    haslo: string;

    @Column({ default: Role.User })
    rola: Role;

    @OneToMany(() => Vehicle, vehicle => vehicle.user)
    pojazdy: Promise<Vehicle[]>

    @OneToMany(() => Ticket, ticket => ticket.user)
    mandaty: Promise<Ticket[]>
}
