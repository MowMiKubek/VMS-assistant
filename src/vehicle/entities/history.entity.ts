import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'historia'})
export class History {
    @PrimaryGeneratedColumn()
    id_wpis: number;

    @Column({type: 'datetime'})
    poczatek: Date;

    @Column({type: 'datetime', nullable: true})
    koniec: Date;

    @Column({type: 'int'})
    id_pojazdu: number;

    @Column({type: 'int'})
    id_user: number;
}