import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserNotFound } from 'src/platzi-api/errors/user-not-found.error';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('/:username')
  async generateImage(@Param('username') username: string) {
    try {
      return await this.cardService.generateCardForUsername(username);
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
