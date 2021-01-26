import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UserNotFound } from '../platzi-api/errors/user-not-found.error';
import { CardService } from './card.service';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('/:username')
  async generateImage(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param('username') username: string,
  ) {
    try {
      const response = await this.cardService.generateCardForUsername(username);

      res.header('Content-Type', 'image/svg+xml');

      return response;
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
