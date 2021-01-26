import { Test, TestingModule } from '@nestjs/testing';
import { PlatziApiService } from './platzi-api.service';

describe('PlatziApiService', () => {
  let service: PlatziApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatziApiService],
    }).compile();

    service = module.get<PlatziApiService>(PlatziApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
