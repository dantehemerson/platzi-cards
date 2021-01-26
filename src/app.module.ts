import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { RendererService } from './renderer/renderer.service';

@Module({
  imports: [CardModule],
  providers: [RendererService],
})
export class AppModule {}
