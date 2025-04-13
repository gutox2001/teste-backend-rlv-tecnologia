import { Test, TestingModule } from '@nestjs/testing';
import { PostNacionalHolidaysService } from './post-nacional-holidays.service';

describe('PostNacionalHolidaysService', () => {
  let service: PostNacionalHolidaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostNacionalHolidaysService],
    }).compile();

    service = module.get<PostNacionalHolidaysService>(PostNacionalHolidaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
