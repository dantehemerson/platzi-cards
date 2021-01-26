import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { config } from './config/config';

@Controller()
export class AppController {
  @Redirect(config.repoUrl, HttpStatus.FOUND)
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async generateImage() {}
}
