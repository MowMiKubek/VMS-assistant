import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'koszty' })
export class Cost {
    @PrimaryGeneratedColumn()
    id_kosztu: number;

    @ApiProperty({ example: 'Mycie samochodu' })
    @Column({ length: 50 })
    nazwa: string;

    @ApiProperty({ example: 'Mycie samochodu na myjni automatycznej' })
    @Column({ type: 'text' })
    opis: string;

    @ApiProperty({ example: 15000 })
    @Column({ type: Number })
    koszt: number;

    @ApiProperty({ example: '2021-08-10T15:00.00Z' })
    @Column({ type: Date })
    data: Date;

    @ApiProperty({ example: 1 })
    @Column({ type: Number })
    id_user: number;

    @ManyToOne(() => User, user => user.koszty)
    @JoinColumn({ name: 'id_user' })
    user: User;
}
