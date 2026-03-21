import { Module } from '@nestjs/common';
import { ClaudeAdapter } from './adapters/claude.adapter';
import { DeepSeekAdapter } from './adapters/deepseek.adapter';

@Module({
  providers: [ClaudeAdapter, DeepSeekAdapter],
  exports: [ClaudeAdapter, DeepSeekAdapter],
})
export class LlmModule {}
