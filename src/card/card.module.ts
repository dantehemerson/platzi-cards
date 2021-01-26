import { Module } from '@nestjs/common';
import { PlatziApiModule } from '../platzi-api/platzi-api.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [PlatziApiModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
