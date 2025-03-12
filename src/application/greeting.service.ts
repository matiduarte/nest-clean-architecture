import { Injectable, Inject } from '@nestjs/common';
import { Greeting } from '../domain/greeting';
import { GreetingRepository } from '../domain/greeting-repository.interface';

@Injectable()
export class GreetingService {
  constructor(
    @Inject('GreetingRepository')
    private readonly greetingRepository: GreetingRepository,
  ) {}

  async getGreetings(): Promise<Greeting[]> {
    return await this.greetingRepository.getGreetings();
  }

  async createGreeting(message: string, date: string): Promise<Greeting> {
    const greeting = new Greeting(message, date);
    return await this.greetingRepository.createGreeting(greeting);
  }
}
