import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GreetingService } from '../../application/greeting.service';
import { Greeting } from '../../domain/greeting';
import { CreateGreetingDto } from '../dto/greeting.dto';

@Controller('greetings')
export class HelloController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getGreetings(): Promise<Greeting[]> {
    return await this.greetingService.getGreetings();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createGreeting(
    @Body() createGreetingDto: CreateGreetingDto,
  ): Promise<Greeting> {
    return await this.greetingService.createGreeting(createGreetingDto.message);
  }
}
