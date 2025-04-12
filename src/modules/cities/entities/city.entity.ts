import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('City')
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, nullable: false })
	name: string;

	@Column({ length: 7, nullable: false, unique: true })
	ibge_code: string;
}
