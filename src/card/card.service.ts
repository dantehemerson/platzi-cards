import { Injectable } from '@nestjs/common';
import { PlatziApiService } from '../platzi-api/platzi-api.service';

@Injectable()
export class CardService {
  constructor(private readonly platziApiService: PlatziApiService) {}

  async generateCardForUsername(username: string) {
    return this.platziApiService.getUserData(username);
  }
}
