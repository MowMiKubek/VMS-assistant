import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Role } from "../../auth/role/role.enum";
import { Vehicle } from "../..//vehicle/entities/vehicle.entity";
import { Ticket } from "../..//tickets/entities/ticket.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "./permissions.entity";
import { Cost } from "src/costs/entities/cost.entity";

@Entity({name: 'users'})
export class User {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id_user: number;

    @ApiProperty({ example: 'Jan' })
    @Column({ length: 50 })
    imie: string;

    @ApiProperty({ example: 'Nowak'})
    @Column({ length: 50 })
    nazwisko: string;

    @ApiProperty({ example: 'jnowak@gmail.com' })
    @Column({ length: 45, unique: true })
    email: string;

    @ApiProperty({ example: 'jnowak'})
    @Column({ length: 45, unique: true })
    login: string;

    @Exclude()
    @Column('text')
    haslo: string;

    @ApiProperty({ example: Role.User, default: Role.User })
    @Column({ type: 'enum', enum: Role, default: Role.User })
    rola: Role;

    @OneToMany(() => Vehicle, vehicle => vehicle.user)
    pojazdy: Promise<Vehicle[]>

    @OneToMany(() => Ticket, ticket => ticket.user)
    mandaty: Promise<Ticket[]>

    @OneToMany(() => Permission, permission => permission.user, { eager: true })
    permissions: Permission[];

    @OneToMany(() => Cost, cost => cost.user)
    koszty: Promise<Cost[]>;
}
