import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "uprawnienia" })
export class Permission {
    @PrimaryGeneratedColumn({ name: "id_uprawnienia" })
    id: number;

    @Column({ length: 2, name: "kategoria" })
    kategoria: string;

    @Column({ type: Number, name: "id_user" })
    id_user: number;

    @ManyToOne(() => User, user => user.permissions)
    @JoinColumn({ name: "id_user" })
    user: User;
}
