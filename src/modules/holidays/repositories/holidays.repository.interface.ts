import { DeleteResult } from "typeorm";
import { ICreateHoliday } from "../dtos/create-holiday/create-holiday.interface";
import { Holiday } from "../entities/holiday.entity";

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