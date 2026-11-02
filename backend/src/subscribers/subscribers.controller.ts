
import { Controller, Post, Body } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(
    private readonly subscribersService: SubscribersService,
  ) {}

  @Post()
  create(@Body() body: { email: string }) {
    return this.subscribersService.create(body.email);
  }
}
