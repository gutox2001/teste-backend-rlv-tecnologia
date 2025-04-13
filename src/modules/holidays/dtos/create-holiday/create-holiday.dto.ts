import { IsString, IsNotEmpty } from 'class-validator';

export class CreateHolidayDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}
