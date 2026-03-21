import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodRecord, FoodRecordDocument } from './schemas/food-record.schema';

/**
 * 美食记录服务（MVP 核心模块）
 * 负责用户饮食记录的创建和查询
 */
@Injectable()
export class FoodService {
  constructor(
    @InjectModel(FoodRecord.name) private foodModel: Model<FoodRecordDocument>,
  ) {}

  /** 创建一条饮食记录 */
  async create(
    userId: string,
    description: string,
    mealType?: string,
    calories?: number,
  ): Promise<FoodRecordDocument> {
    return this.foodModel.create({ userId, description, mealType, calories });
  }

  /** 查询用户所有饮食记录，按时间倒序（最新的在前） */
  async findByUser(userId: string): Promise<FoodRecordDocument[]> {
    return this.foodModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
