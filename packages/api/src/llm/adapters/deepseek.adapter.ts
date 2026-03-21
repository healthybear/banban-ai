/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { ILLMAdapter, ILLMMessage } from '../llm.interface';

/**
 * DeepSeek 适配器（占位实现）
 * DeepSeek API 兼容 OpenAI 格式，可使用 openai SDK 接入
 * 文档：https://platform.deepseek.com/api-docs
 * TODO: 实现真实的 DeepSeek API 调用
 */
@Injectable()
export class DeepSeekAdapter implements ILLMAdapter {
  async chat(
    messages: ILLMMessage[],
    options?: { maxTokens?: number },
  ): Promise<string> {
    // 占位实现，待接入 DeepSeek SDK
    throw new Error('DeepSeek adapter not implemented yet');
  }
}
