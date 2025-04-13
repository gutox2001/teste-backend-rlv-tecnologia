import { Test, TestingModule } from '@nestjs/testing';
import { DeleteStatesService } from './delete-states.service';

describe('DeleteStatesService', () => {
	let service: DeleteStatesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DeleteStatesService],
		}).compile();

		service = module.get<DeleteStatesService>(DeleteStatesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
