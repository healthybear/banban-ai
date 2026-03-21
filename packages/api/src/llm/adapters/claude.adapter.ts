/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { ILLMAdapter, ILLMMessage } from '../llm.interface';

/**
 * Claude 适配器（占位实现）
 * 后续接入 Anthropic SDK：https://docs.anthropic.com/en/api/getting-started
 * TODO: 实现真实的 Claude API 调用
 */
@Injectable()
export class ClaudeAdapter implements ILLMAdapter {
  async chat(
    messages: ILLMMessage[],
    options?: { maxTokens?: number },
  ): Promise<string> {
    // 占位实现，待接入 Anthropic SDK
    throw new Error('Claude adapter not implemented yet');
  }
}
