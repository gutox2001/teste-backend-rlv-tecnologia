import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCitiesServiceTsService } from './delete-cities.service';

describe('DeleteCitiesServiceTsService', () => {
	let service: DeleteCitiesServiceTsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DeleteCitiesServiceTsService],
		}).compile();

		service = module.get<DeleteCitiesServiceTsService>(DeleteCitiesServiceTsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
