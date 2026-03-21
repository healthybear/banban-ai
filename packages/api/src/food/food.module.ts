import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodRecord, FoodRecordSchema } from './schemas/food-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodRecord.name, schema: FoodRecordSchema },
    ]),
  ],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
