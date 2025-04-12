import { Test, TestingModule } from '@nestjs/testing';
import { GetCitiesService } from './get-cities.service';

describe('GetCitiesService', () => {
  let service: GetCitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCitiesService],
    }).compile();

    service = module.get<GetCitiesService>(GetCitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
