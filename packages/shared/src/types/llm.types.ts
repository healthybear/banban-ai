export enum LLMProvider {
  CLAUDE = 'claude',
  DEEPSEEK = 'deepseek',
}

export interface ILLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ILLMRequest {
  messages: ILLMMessage[];
  provider?: LLMProvider;
  maxTokens?: number;
}

export interface ILLMResponse {
  content: string;
  provider: LLMProvider;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}
