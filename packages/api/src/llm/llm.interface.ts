/**
 * LLM 消息格式
 * 与 OpenAI / Anthropic 通用的消息结构
 */
export interface ILLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * LLM 适配器接口
 * 所有 LLM 提供商（Claude、DeepSeek 等）必须实现此接口
 * 保证上层业务代码与具体 LLM 提供商解耦
 */
export interface ILLMAdapter {
  chat(
    messages: ILLMMessage[],
    options?: { maxTokens?: number },
  ): Promise<string>;
}
