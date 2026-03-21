import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

/**
 * 对话服务
 * 负责消息的存储和历史记录查询
 */
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  /**
   * 获取指定会话的历史消息
   * 按时间正序排列，用于构建 LLM 上下文
   */
  async getHistory(
    userId: string,
    sessionId: string,
  ): Promise<MessageDocument[]> {
    return this.messageModel
      .find({ userId, sessionId })
      .sort({ createdAt: 1 })
      .exec();
  }

  /** 保存一条消息到数据库 */
  async saveMessage(
    userId: string,
    sessionId: string,
    role: string,
    content: string,
  ): Promise<MessageDocument> {
    return this.messageModel.create({ userId, sessionId, role, content });
  }
}
