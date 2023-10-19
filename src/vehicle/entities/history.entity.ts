import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'historia'})
export class History {
    @PrimaryGeneratedColumn()
    id_wpis: number;

    @Column({type: 'timestamp'})
    poczatek: Date;

    @Column({type: 'timestamp', nullable: true})
    koniec: Date;

    @Column({type: 'int'})
    id_pojazdu: number;

    @Column({type: 'int'})
    id_user: number;
}