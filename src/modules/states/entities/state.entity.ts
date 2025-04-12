import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('State')
export class State {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 2,
		unique: true,
		enum: [
			'AC',
			'AL',
			'AP',
			'AM',
			'BA',
			'CE',
			'DF',
			'ES',
			'GO',
			'MA',
			'MT',
			'MS',
			'MG',
			'PA',
			'PB',
			'PR',
			'PE',
			'PI',
			'RJ',
			'RN',
			'RS',
			'RO',
			'RR',
			'SC',
			'SP',
			'SE',
			'TO',
		],
	})
	uf: string;

	@Column({
		nullable: false,
		unique: true,
		enum: [
			12, 27, 16, 13, 29, 23, 53, 32, 52, 21, 51, 50, 31, 15, 25, 41, 26, 22, 33, 24, 43, 11, 14, 42, 35, 28, 17,
		],
	})
	prefix: number;
}
