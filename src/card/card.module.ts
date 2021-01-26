import { Module } from '@nestjs/common';
import { PlatziApiModule } from '../platzi-api/platzi-api.module';
import { RendererModule } from '../renderer/renderer.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [PlatziApiModule, RendererModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
