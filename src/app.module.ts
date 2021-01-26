import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { RendererService } from './renderer/renderer.service';
import { AppController } from './app.controller';

@Module({
  imports: [CardModule],
  controllers: [AppController],
  providers: [RendererService],
})
export class AppModule {}
