import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * 对话控制器
 * 所有接口需要 JWT 认证
 */
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  /**
   * 获取指定会话的历史消息
   * GET /chat/:sessionId/history
   * TODO: 从 request.user 中提取 userId
   */
  @Get(':sessionId/history')
  getHistory(@Param('sessionId') sessionId: string) {
    // TODO: get userId from request user
    return this.chatService.getHistory('', sessionId);
  }
}
