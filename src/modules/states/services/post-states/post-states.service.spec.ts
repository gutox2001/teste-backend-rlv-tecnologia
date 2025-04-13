import { Test, TestingModule } from '@nestjs/testing';
import { PostStatesService } from './post-states.service';

describe('PostStatesService', () => {
	let service: PostStatesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PostStatesService],
		}).compile();

		service = module.get<PostStatesService>(PostStatesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
