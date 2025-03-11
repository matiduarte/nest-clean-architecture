import { MongooseModule } from '@nestjs/mongoose';
import { HelloController } from './infrastructure/controllers/hello.controller';
import { GreetingService } from './application/greeting.service';
import { MongoGreetingRepository } from './infrastructure/repositories/mongo-greeting.repository';
import { GreetingSchema } from './infrastructure/models/greeting.schema';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    // Connect to MongoDB (adjust connection string as needed)
    MongooseModule.forRoot('mongodb://localhost/nest'),
    // Register the Greeting model for injection
    MongooseModule.forFeature([{ name: 'Greeting', schema: GreetingSchema }]),
  ],
  controllers: [HelloController],
  providers: [
    GreetingService,
    {
      provide: 'GreetingRepository',
      useClass: MongoGreetingRepository,
    },
  ],
})
export class AppModule {}
