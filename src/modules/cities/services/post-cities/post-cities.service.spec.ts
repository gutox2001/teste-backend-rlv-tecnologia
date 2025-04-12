import { Test, TestingModule } from '@nestjs/testing';
import { PostCitiesService } from './post-cities.service';

describe('PostCitiesService', () => {
	let service: PostCitiesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PostCitiesService],
		}).compile();

		service = module.get<PostCitiesService>(PostCitiesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
