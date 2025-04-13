import { Test, TestingModule } from '@nestjs/testing';
import { GetHolidaysService } from './get-holidays.service';

describe('GetHolidaysService', () => {
	let service: GetHolidaysService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GetHolidaysService],
		}).compile();

		service = module.get<GetHolidaysService>(GetHolidaysService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
