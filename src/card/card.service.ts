import { Injectable } from '@nestjs/common';
import { RendererService } from 'src/renderer/renderer.service';
import { PlatziApiService } from '../platzi-api/platzi-api.service';

@Injectable()
export class CardService {
  constructor(
    private readonly platziApiService: PlatziApiService,
    private readonly rendererService: RendererService,
  ) {}

  async generateCardForUsername(username: string) {
    try {
      const user = await this.platziApiService.getUserData(username);
      return this.rendererService.render(user);
    } catch (error) {
      throw error;
    }
  }
}
