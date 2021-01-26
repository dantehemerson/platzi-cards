import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserNotFound } from 'src/platzi-api/errors/user-not-found.error';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Header('Content-Type', 'image/svg+xml')
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
