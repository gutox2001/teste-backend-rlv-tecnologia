import { Test, TestingModule } from '@nestjs/testing';
import { PostStateService } from './post-state.service';

describe('PostStateService', () => {
	let service: PostStateService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PostStateService],
		}).compile();

		service = module.get<PostStateService>(PostStateService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
