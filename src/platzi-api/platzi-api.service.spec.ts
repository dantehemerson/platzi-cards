import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PlatziApiService } from './platzi-api.service';
import { SsrDataExtractor } from './providers/ssr-data-extractor.provider';

describe('PlatziApiService', () => {
  let service: PlatziApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PlatziApiService, SsrDataExtractor],
    }).compile();

    service = module.get<PlatziApiService>(PlatziApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
