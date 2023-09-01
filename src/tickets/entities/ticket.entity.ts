import { ApiProperty } from "@nestjs/swagger";
import { User } from "../..//user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mandaty' })
export class Ticket {
    @PrimaryGeneratedColumn()
    id_mandatu: number;
    
    @ApiProperty({ example: 'Przekroczenie prędkości' })
    @Column({ length: 50})
    nazwa: string;
    
    @ApiProperty({ example: 5 })
    @Column({ type: 'integer' })
    liczba_punktow: number;
    
    @ApiProperty({ example: 24 })
    @Column({ type: 'integer' })
    waznosc: number;
    
    @ApiProperty({ example: '2023-08-10T15:00.00Z' })
    @Column({ type: 'datetime' })
    data_wystawienia: Date;
    
    @ApiProperty({ example: 80000 })
    @Column({ type: 'integer' })
    cena: number;

    @ApiProperty({ example: 1 })
    @Column({ type: 'integer' })
    id_user: number;

    @ManyToOne(() => User, user => user.mandaty)
    @JoinColumn({ name: 'id_user' })
    user: User;
}
