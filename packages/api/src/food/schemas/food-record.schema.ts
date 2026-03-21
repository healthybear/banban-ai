import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FoodRecordDocument = FoodRecord & Document;

/**
 * 饮食记录 Schema
 * MVP 核心数据模型，记录用户每餐的饮食信息
 * calories 和 mealType 可由 AI 分析后自动填充
 */
@Schema({ timestamps: true })
export class FoodRecord {
  /** 饮食文字描述，由用户输入或 AI 识别 */
  @Prop({ required: true })
  description!: string;

  /** 卡路里（千卡），可选，由 AI 分析填充 */
  @Prop()
  calories?: number;

  /** 餐次类型 */
  @Prop({ enum: ['breakfast', 'lunch', 'dinner', 'snack'] })
  mealType?: string;

  /** 关联用户 ID */
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId!: Types.ObjectId;
}

export const FoodRecordSchema = SchemaFactory.createForClass(FoodRecord);
