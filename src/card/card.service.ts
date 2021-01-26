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
    console.log('JOJOJOJIOJOIJOI');
    try {
      const user = await this.platziApiService.getUserData(username);
      return this.rendererService.render(user);
    } catch (error) {
      console.log(
        '🤫 Dante ➤ CardService ➤ generateCardForUsername ➤ error',
        error,
      );
      return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390px" version="1.2" height="120"><g transform="translate(0, 0)">

    

        
      
      </svg>`;
    }
  }
}
