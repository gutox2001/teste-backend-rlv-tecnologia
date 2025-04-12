import { Test, TestingModule } from '@nestjs/testing';
import { DeleteHolidayService } from './delete-holiday.service';

describe('DeleteHolidayService', () => {
  let service: DeleteHolidayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteHolidayService],
    }).compile();

    service = module.get<DeleteHolidayService>(DeleteHolidayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
