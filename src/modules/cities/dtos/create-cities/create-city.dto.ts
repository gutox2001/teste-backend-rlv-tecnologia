import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
	@IsString()
	@IsNotEmpty()
	ibge_code: string;
	
	@IsString()
	@IsNotEmpty()
	name: string;
}