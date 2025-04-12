import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStateDto {
	@IsString()
	@IsNotEmpty()
	ibge_code: string;
	
	@IsString()
	@IsNotEmpty()
	uf: string;
}