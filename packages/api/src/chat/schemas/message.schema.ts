import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

/**
 * 消息 Schema
 * 记录用户与 AI 之间的对话消息，按 sessionId 分组
 */
@Schema({ timestamps: true })
export class Message {
  /** 消息角色：user（用户）/ assistant（AI）/ system（系统提示词） */
  @Prop({ required: true, enum: ['user', 'assistant', 'system'] })
  role!: string;

  /** 消息内容 */
  @Prop({ required: true })
  content!: string;

  /** 所属用户 ID */
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId!: Types.ObjectId;

  /** 会话 ID，用于隔离不同对话上下文 */
  @Prop({ required: true })
  sessionId!: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
