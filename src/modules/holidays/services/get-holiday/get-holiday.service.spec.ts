import { Test, TestingModule } from '@nestjs/testing';
import { GetHolidayService } from './get-holiday.service';

describe('GetHolidayService', () => {
	let service: GetHolidayService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GetHolidayService],
		}).compile();

		service = module.get<GetHolidayService>(GetHolidayService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
