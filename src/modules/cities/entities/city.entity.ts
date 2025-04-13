import { Holiday } from 'src/modules/holidays/entities/holiday.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('City')
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, nullable: false })
	name: string;

	@Column({ length: 7, nullable: false, unique: true })
	ibgeCode: string;

	@OneToMany(() => Holiday, holiday => holiday.city)
	holidays: Holiday[];
}
