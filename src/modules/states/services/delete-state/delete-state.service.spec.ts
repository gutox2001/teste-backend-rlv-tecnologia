import { Test, TestingModule } from '@nestjs/testing';
import { DeleteStateService } from './delete-state.service';

describe('DeleteStateService', () => {
  let service: DeleteStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteStateService],
    }).compile();

    service = module.get<DeleteStateService>(DeleteStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
