import { Test, TestingModule } from '@nestjs/testing';
import { PutHolidayService } from './put-holiday.service';

describe('PutHolidayService', () => {
	let service: PutHolidayService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PutHolidayService],
		}).compile();

		service = module.get<PutHolidayService>(PutHolidayService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
