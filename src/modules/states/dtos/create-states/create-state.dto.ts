import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateStateDto {
	@IsInt()
	@IsNotEmpty()
	prefix: number;
	
	@IsString()
	@IsNotEmpty()
	uf: string;
}