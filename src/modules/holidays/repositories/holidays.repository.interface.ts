import { DeleteResult } from 'typeorm';
import { ICreateHoliday } from '../dtos/create-holiday/create-holiday.interface';
import { Holiday } from '../entities/holiday.entity';

export interface IHolidaysRepository {
	/**
	 * Create a new holiday
	 * @param {ICreateHoliday} createHoliday - The holiday to be created
	 * @returns {Promise<Holiday>} - The created holiday
	 */
	create(data: ICreateHoliday): Promise<Holiday>;

	/**
	 * Find all holidays
	 * @returns {Promise<Holiday[]>} - The list of holidays
	 */
	findAll(): Promise<Holiday[]>;

	/**
	 * Find a holiday by id
	 * @param {number} id - The id of the holiday to be found
	 * @returns {Promise<Holiday | null>} - The found holiday
	 */
	findById(id: number): Promise<Holiday | null>;

	/**
	 * Find a holiday by date
	 * @param {string} date - The date of the holiday to be found
	 * @returns {Promise<Holiday[]>} - The found holiday
	 */
	findByDate(date: string): Promise<Holiday[]>;

	/**
	 * Find a holiday by state id
	 * @param {string} ibgeCode - The ibge code of the state to be found
	 * @returns {Promise<Holiday[]>} - The list of holidays for the state
	 */
	findByStateIbgeCode(ibgeCode: string): Promise<Holiday[]>;

	/**
	 *
	 * @param {string} ibgeCode - The ibge code of the city to be found
	 * @returns {Promise<Holiday[]>} - The list of holidays for the city
	 */
	findByCityIbgeCode(ibgeCode: string): Promise<Holiday[]>;

	/**
	 * Find holidays by type
	 * @param {string} type - The type of the holiday to be found
	 * @returns {Promise<Holiday[]>} - The list of holidays for the type
	 */
	findByType(type: string): Promise<Holiday[]>;

	/**
	 * Update a holiday by id
	 * @param {number} id - The id of the holiday to be updated
	 * @param {ICreateHoliday} updateHoliday - The holiday to be updated
	 * @returns {Promise<Holiday>} - The updated holiday
	 */
	update(id: number, updateHoliday: ICreateHoliday): Promise<Holiday>;

	/**
	 * Delete a holiday by id
	 * @param {number} id - The id of the holiday to be deleted
	 * @returns {Promise<DeleteResult>} - A promise that resolves when the holiday is deleted
	 */
	delete(id: number): Promise<DeleteResult>;

	/**
	 * Delete all holidays
	 * @returns {Promise<DeleteResult>} - A promise that resolves when all holidays are deleted
	 * @description This method is used to delete all holidays from the database.
	 */
	deleteAll(): Promise<DeleteResult>;
}
