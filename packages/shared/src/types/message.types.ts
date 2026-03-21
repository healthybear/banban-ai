export type MessageRole = 'user' | 'assistant' | 'system';

export interface IMessage {
  _id: string;
  role: MessageRole;
  content: string;
  userId: string;
  sessionId: string;
  createdAt: Date;
}
