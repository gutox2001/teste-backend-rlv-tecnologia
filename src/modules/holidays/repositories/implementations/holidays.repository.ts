import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

import { HOLIDAY_REPOSITORY } from 'src/modules/database/constants';
import { Holiday } from '../../entities/holiday.entity';

import { ICreateHoliday } from '../../dtos/create-holiday/create-holiday.interface';
import { IHolidaysRepository } from '../holidays.repository.interface';

@Injectable()
export class HolidaysRepository implements IHolidaysRepository {
	constructor(
		@Inject(HOLIDAY_REPOSITORY)
		private holidayRepository: Repository<Holiday>,
	) {}

	async findAll(): Promise<Holiday[]> {
		return this.holidayRepository.find();
	}

	findById(id: number): Promise<Holiday | null> {
		const holiday = this.holidayRepository.findOne({
			select: {
				id: true,
				name: true,
				ibgeCode: true,
			},
			where: {
				id: id,
			},
		});

		return holiday;
	}

	findByIbgeCode(ibge_code: string): Promise<Holiday | null> {
		const Holiday = this.holidayRepository.findOne({
			select: {
				id: true,
				name: true,
				ibgeCode: true,
			},
			where: {
				ibgeCode: ibge_code,
			},
		});

		return Holiday;
	}

	findByName(name: string): Promise<Holiday | null> {
		const Holiday = this.holidayRepository.findOne({
			select: {
				id: true,
				name: true,
				ibgeCode: true,
			},
			where: {
				name: name,
			},
		});

		return Holiday;
	}

	create(data: ICreateHoliday): Promise<Holiday> {
		const newHoliday = this.holidayRepository.create(data);

		return this.holidayRepository.save(newHoliday);
	}

	async update(id: number, updateHoliday: ICreateHoliday): Promise<Holiday> {
		await this.holidayRepository.update(id, updateHoliday);
		const updatedHoliday = await this.holidayRepository.findOneBy({ id });

		if (!updatedHoliday) {
			throw new Error(`Holiday with id ${id} not found.`);
		}

		return updatedHoliday;
	}

	delete(id: number): Promise<DeleteResult> {
		return this.holidayRepository.delete(id);
	}

	deleteAll(): Promise<DeleteResult> {
		return this.holidayRepository.delete({});
	}
}
