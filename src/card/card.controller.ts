import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { config } from '../config/config';
import { UserNotFound } from '../platzi-api/errors/user-not-found.error';
import { CardService } from './card.service';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('/p/:username')
  async generateImage(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param('username') username: string,
  ) {
    console.log(`[CardController] Generating user card for ${username}`);
    try {
      const response = await this.cardService.generateCardForUsername(username);

      res.header('Cache-Control', `public, max-age=${config.ttlSeconds}`);
      res.header('Content-Type', 'image/svg+xml');

      return response;
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new NotFoundException(error.message);
      }
      return {
        message: `An error ocurred while generting card for @${username}`,
        error: {
          message: error?.message,
          code: error?.code,
          stack: error?.stack,
        },
      };
    }
  }
}
