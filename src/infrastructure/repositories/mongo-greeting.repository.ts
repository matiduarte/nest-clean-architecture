import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GreetingRepository } from '../../domain/greeting-repository.interface';
import { Greeting } from '../../domain/greeting';
import { GreetingDocument } from '../models/greeting.schema';

@Injectable()
export class MongoGreetingRepository implements GreetingRepository {
  constructor(
    @InjectModel('Greeting')
    private readonly greetingModel: Model<GreetingDocument>,
  ) {}

  async getGreetings(): Promise<Greeting[]> {
    const docs = await this.greetingModel.find().exec();
    return docs.map((doc) => new Greeting(doc.message, doc.date));
  }

  async createGreeting(greeting: Greeting): Promise<Greeting> {
    const created = new this.greetingModel({
      message: greeting.message,
      date: greeting.date,
    });
    const saved = await created.save();
    return new Greeting(saved.message, saved.date);
  }
}
