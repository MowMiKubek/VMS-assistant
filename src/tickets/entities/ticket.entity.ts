import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mandaty' })
export class Ticket {
    @PrimaryGeneratedColumn()
    id_mandatu: number;
    
    @Column({ length: 50})
    nazwa: string;
    
    @Column({ type: 'integer' })
    liczba_punktow: number;
    
    @Column({ type: 'integer' })
    waznosc: number;
    
    @Column({ type: 'datetime' })
    data_wystawienia: Date;
    
    @Column({ type: 'integer' })
    cena: number;

    @Column({ type: 'integer' })
    id_user: number;

    @ManyToOne(() => User, user => user.mandaty)
    @JoinColumn({ name: 'id_user' })
    user: User;
}
