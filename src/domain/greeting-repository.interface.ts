import { Greeting } from './greeting';

export interface GreetingRepository {
  getGreetings(): Promise<Greeting[]>;
  createGreeting(greeting: Greeting): Promise<Greeting>;
}
