import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('City')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 7 })
    ibge_code: string;
}