import { Module } from '@nestjs/common';
import { RendererService } from './renderer.service';

@Module({
  providers: [RendererService],
  exports: [RendererService],
})
export class RendererModule {}
