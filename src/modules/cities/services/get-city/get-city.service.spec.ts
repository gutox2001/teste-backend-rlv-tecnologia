import { Test, TestingModule } from '@nestjs/testing';
import { GetCityService } from './get-city.service';

describe('GetCityService', () => {
  let service: GetCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCityService],
    }).compile();

    service = module.get<GetCityService>(GetCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
