import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCityService } from './delete-city.service';

describe('DeleteCityService', () => {
	let service: DeleteCityService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DeleteCityService],
		}).compile();

		service = module.get<DeleteCityService>(DeleteCityService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
