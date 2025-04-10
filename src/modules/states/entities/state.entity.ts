import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('State')
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 2, unique: true })
    uf: string;

    @Column({ length: 100 })
    name: string;
}