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

	async findByDate(date: string): Promise<Holiday[]> {
		const holiday = await this.holidayRepository.find({
			select: {
				id: true,
				name: true,
				date: true,
				state: true,
				city: true,
				type: true,
			},
			where: {
				date: date,
			},
			relations: ['city', 'state'],
		});

		return holiday;
	}

	async findByStateIbgeCode(ibgeCode: string): Promise<Holiday[]> {
		return this.holidayRepository
			.createQueryBuilder('holiday')
			.leftJoinAndSelect('holiday.state', 'state')
			.where('state.ibgeCode = :ibgeCode', { ibgeCode })
			.getMany();
	}

	async findByCityIbgeCode(ibgeCode: string): Promise<Holiday[]> {
		return this.holidayRepository
			.createQueryBuilder('holiday')
			.leftJoinAndSelect('holiday.city', 'city')
			.where('city.ibgeCode = :ibgeCode', { ibgeCode })
			.getMany();
	}

	findByType(type: string): Promise<Holiday[]> {
		const holidays = this.holidayRepository.find({
			select: {
				id: true,
				name: true,
				date: true,
				state: true,
				city: true,
				type: true,
			},
			where: {
				type: type,
			},
			relations: ['city', 'state'],
		});

		return holidays;
	}

	async findAll(): Promise<Holiday[]> {
		return this.holidayRepository.find({
			relations: ['city', 'state'],
		});
	}

	findById(id: number): Promise<Holiday | null> {
		const holiday = this.holidayRepository.findOne({
			select: {
				id: true,
				name: true,
				date: true,
				state: true,
				city: true,
				type: true,
			},
			where: {
				id: id,
			},
			relations: ['city', 'state'],
		});

		return holiday;
	}

	findByName(name: string): Promise<Holiday | null> {
		const holiday = this.holidayRepository.findOne({
			select: {
				id: true,
				name: true,
				date: true,
				state: true,
				city: true,
				type: true,
			},
			where: {
				name: name,
			},
			relations: ['city', 'state'],
		});

		return holiday;
	}

	create(data: ICreateHoliday): Promise<Holiday> {
		const newHoliday = this.holidayRepository.create(data);

		if (data.cityId) {
			newHoliday.city = { id: data.cityId } as any;
		}
		if (data.stateId) {
			newHoliday.state = { id: data.stateId } as any;
		}

		return this.holidayRepository.save(newHoliday);
	}

	async update(id: number, updateHoliday: Holiday): Promise<Holiday> {
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
