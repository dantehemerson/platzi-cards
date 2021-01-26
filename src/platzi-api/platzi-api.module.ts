import { HttpModule, Module } from '@nestjs/common';
import { PlatziApiService } from './platzi-api.service';
import { SsrDataExtractor } from './providers/ssr-data-extractor.provider';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://platzi.com',
    }),
  ],
  providers: [PlatziApiService, SsrDataExtractor],
  exports: [PlatziApiService],
})
export class PlatziApiModule {}
