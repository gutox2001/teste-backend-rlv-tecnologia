import { Test, TestingModule } from '@nestjs/testing';
import { GetStatesService } from './get-states.service';

describe('GetStatesService', () => {
	let service: GetStatesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GetStatesService],
		}).compile();

		service = module.get<GetStatesService>(GetStatesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
