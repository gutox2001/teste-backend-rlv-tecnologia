import { Test, TestingModule } from '@nestjs/testing';
import { GetStateService } from './get-state.service';

describe('GetStateService', () => {
  let service: GetStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetStateService],
    }).compile();

    service = module.get<GetStateService>(GetStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
