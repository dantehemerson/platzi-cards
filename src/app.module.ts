import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';

@Module({
  imports: [CardModule],
})
export class AppModule {}
