import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { UserNotFound } from './errors/user-not-found.error';
import { User } from './interfaces/user.interface';
import { SsrDataExtractor } from './providers/ssr-data-extractor.provider';

@Injectable()
export class PlatziApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly ssrDataExtractor: SsrDataExtractor,
  ) {}

  async getUserData(username: string): Promise<User> {
    const data = await this.fetchPage(`/p/${username}`);
    return this.ssrDataExtractor.extractData<User>(data);
  }

  private async fetchPage(url: string) {
    try {
      const { data } = await this.httpService.get(url).toPromise();
      return data;
    } catch (error) {
      if (error?.response?.status === HttpStatus.NOT_FOUND) {
        throw new UserNotFound();
      }
      console.log('🤫 Dante ➤ PlatziApiService ➤ fetchPage ➤ error', error);
      return null;
    }
  }
}
