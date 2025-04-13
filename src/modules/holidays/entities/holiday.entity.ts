import { City } from 'src/modules/cities/entities/city.entity';
import { State } from 'src/modules/states/entities/state.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Holiday')
export class Holiday {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, nullable: false })
	name: string;

	@Column({ nullable: false, enum: ['NACIONAL', 'ESTADUAL', 'MUNICIPAL'] })
	type: string;

	@Column({ nullable: false })
	date: string;

	@ManyToOne(() => City, city => city.holidays, { nullable: true })
	city?: City;

	@ManyToOne(() => State, state => state.holidays, { nullable: true })
	state?: State;
}
