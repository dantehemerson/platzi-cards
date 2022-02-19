import { HttpModule, Module } from '@nestjs/common';
import { PlatziApiService } from './platzi-api.service';
import { SsrDataExtractor } from './providers/ssr-data-extractor.provider';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.POWERFUL_GENERIC_SCRAPPER,
    }),
  ],
  providers: [PlatziApiService, SsrDataExtractor],
  exports: [PlatziApiService],
})
export class PlatziApiModule {}
