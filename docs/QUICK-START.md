# 快速开始指南 - 单人开发版

> 从零开始搭建智能助手平台的完整指南

## 📋 前置准备

### 必需工具
- [x] Node.js >= 18
- [x] pnpm 或 npm
- [x] Git
- [x] VS Code 或 Cursor
- [x] PostgreSQL 14+
- [x] Redis 6+

### 推荐工具
- [ ] Docker Desktop（本地数据库）
- [ ] Postman（API测试）
- [ ] DBeaver（数据库管理）

### 账号准备
- [ ] GitHub账号
- [ ] Claude API Key
- [ ] DeepSeek API Key（可选）

---

## 🚀 第一周：后端基础搭建

### Day 1-2: 项目初始化

#### 1. 创建项目目录
```bash
mkdir assistant-platform
cd assistant-platform

# 创建子项目
mkdir packages
cd packages
```

#### 2. 初始化后端项目
```bash
mkdir server
cd server
pnpm init

# 安装依赖
pnpm add express cors dotenv
pnpm add -D typescript @types/node @types/express ts-node-dev

# 初始化TypeScript
npx tsc --init
```

#### 3. 配置TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

#### 4. 创建基础结构
```bash
mkdir -p src/{routes,controllers,services,middleware,types}
touch src/index.ts
```

#### 5. 编写入口文件
```typescript
// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

#### 6. 配置启动脚本
```json
// package.json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

#### 7. 测试运行
```bash
pnpm dev
# 访问 http://localhost:3000/health
```

---

### Day 3-4: 数据库集成

#### 1. 安装Prisma
```bash
pnpm add @prisma/client
pnpm add -D prisma
npx prisma init
```

#### 2. 配置数据库连接
```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/assistant_db"
```

#### 3. 定义数据模型
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  conversations Conversation[]
}

model Conversation {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  title     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  messages Message[]
}

model Message {
  id             String       @id @default(uuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  role           String       // 'user' | 'assistant' | 'system'
  content        String
  createdAt      DateTime     @default(now())
}

model Schedule {
  id          String   @id @default(uuid())
  userId      String
  title       String
  description String?
  startTime   DateTime
  endTime     DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 4. 运行迁移
```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### 5. 创建数据库客户端
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

---

### Day 5-7: LLM适配层

#### 1. 安装依赖
```bash
pnpm add axios
```

#### 2. 创建LLM适配器接口
```typescript
// src/services/llm/types.ts
export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LLMProvider {
  name: string;
  chat(messages: LLMMessage[]): Promise<LLMResponse>;
  hasQuota(): Promise<boolean>;
}
```

#### 3. 实现Claude适配器
```typescript
// src/services/llm/providers/claude.ts
import axios from 'axios';
import { LLMProvider, LLMMessage, LLMResponse } from '../types';

export class ClaudeProvider implements LLMProvider {
  name = 'claude';
  private apiKey: string;
  private baseURL = 'https://api.anthropic.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: LLMMessage[]): Promise<LLMResponse> {
    const response = await axios.post(
      `${this.baseURL}/messages`,
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: messages.map(m => ({
          role: m.role === 'system' ? 'user' : m.role,
          content: m.content
        }))
      },
      {
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );

    return {
      content: response.data.content[0].text,
      model: response.data.model,
      usage: {
        promptTokens: response.data.usage.input_tokens,
        completionTokens: response.data.usage.output_tokens,
        totalTokens: response.data.usage.input_tokens + response.data.usage.output_tokens
      }
    };
  }

  async hasQuota(): Promise<boolean> {
    // 实现额度检查逻辑
    return true;
  }
}
```

#### 4. 创建LLM管理器
```typescript
// src/services/llm/manager.ts
import { LLMProvider, LLMMessage, LLMResponse } from './types';
import { ClaudeProvider } from './providers/claude';

export class LLMManager {
  private providers: Map<string, LLMProvider> = new Map();
  private quotaCache: Map<string, boolean> = new Map();

  constructor() {
    // 注册提供商
    if (process.env.CLAUDE_API_KEY) {
      this.providers.set('claude', new ClaudeProvider(process.env.CLAUDE_API_KEY));
    }
  }

  async chat(messages: LLMMessage[], preferredProvider?: string): Promise<LLMResponse> {
    const provider = await this.selectProvider(preferredProvider);
    return provider.chat(messages);
  }

  private async selectProvider(preferred?: string): Promise<LLMProvider> {
    // 如果指定了提供商且有额度，使用它
    if (preferred && this.providers.has(preferred)) {
      const provider = this.providers.get(preferred)!;
      if (await provider.hasQuota()) {
        return provider;
      }
    }

    // 否则找第一个有额度的
    for (const [name, provider] of this.providers) {
      if (await provider.hasQuota()) {
        console.log(`Auto-selected provider: ${name}`);
        return provider;
      }
    }

    throw new Error('No available LLM provider with quota');
  }
}
```

#### 5. 创建聊天API
```typescript
// src/routes/chat.ts
import { Router } from 'express';
import { LLMManager } from '../services/llm/manager';
import prisma from '../lib/prisma';

const router = Router();
const llmManager = new LLMManager();

router.post('/chat', async (req, res) => {
  try {
    const { message, conversationId, userId } = req.body;

    // 获取对话历史
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 10 // 最近10条
        }
      }
    });

    // 构建消息列表
    const messages = [
      ...(conversation?.messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      })) || []),
      { role: 'user' as const, content: message }
    ];

    // 调用LLM
    const response = await llmManager.chat(messages);

    // 保存消息
    await prisma.message.createMany({
      data: [
        {
          conversationId,
          role: 'user',
          content: message
        },
        {
          conversationId,
          role: 'assistant',
          content: response.content
        }
      ]
    });

    res.json({
      message: response.content,
      model: response.model
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

export default router;
```

#### 6. 注册路由
```typescript
// src/index.ts
import chatRoutes from './routes/chat';

app.use('/api', chatRoutes);
```

---

## 🎨 第二周：前端基础搭建

### Day 1-2: Vue项目初始化

#### 1. 创建Vue项目
```bash
cd packages
pnpm create vite web --template vue-ts
cd web
pnpm install
```

#### 2. 安装UI库和工具
```bash
pnpm add naive-ui
pnpm add axios pinia
pnpm add @vueuse/core
```

#### 3. 配置Naive UI
```typescript
// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

#### 4. 创建基础布局
```vue
<!-- src/App.vue -->
<template>
  <n-config-provider :theme="theme">
    <n-layout style="height: 100vh">
      <n-layout-header bordered>
        <div class="header">
          <h2>智能助手</h2>
        </div>
      </n-layout-header>
      <n-layout-content>
        <ChatView />
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent } from 'naive-ui';
import ChatView from './views/ChatView.vue';
import { ref } from 'vue';

const theme = ref(null);
</script>
```

---

### Day 3-5: 聊天界面

#### 1. 创建聊天组件
```vue
<!-- src/views/ChatView.vue -->
<template>
  <div class="chat-container">
    <div class="messages" ref="messagesRef">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['message', msg.role]"
      >
        <div class="content">{{ msg.content }}</div>
      </div>
    </div>

    <div class="input-area">
      <n-input
        v-model:value="inputText"
        type="textarea"
        placeholder="输入消息..."
        @keydown.enter.prevent="sendMessage"
      />
      <n-button type="primary" @click="sendMessage">
        发送
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NInput, NButton } from 'naive-ui';
import axios from 'axios';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const messages = ref<Message[]>([]);
const inputText = ref('');
const conversationId = ref('default-conversation');

const sendMessage = async () => {
  if (!inputText.value.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: inputText.value
  };

  messages.value.push(userMessage);
  const text = inputText.value;
  inputText.value = '';

  try {
    const response = await axios.post('http://localhost:3000/api/chat', {
      message: text,
      conversationId: conversationId.value,
      userId: 'default-user'
    });

    messages.value.push({
      id: Date.now().toString(),
      role: 'assistant',
      content: response.data.message
    });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  max-width: 70%;
}

.message.user {
  background: #e3f2fd;
  margin-left: auto;
}

.message.assistant {
  background: #f5f5f5;
}

.input-area {
  display: flex;
  gap: 12px;
}
</style>
```

---

## 📚 学习资源

### Express
- [Express官方文档](https://expressjs.com/)
- [Express + TypeScript教程](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)

### Prisma
- [Prisma官方文档](https://www.prisma.io/docs)
- [Prisma快速开始](https://www.prisma.io/docs/getting-started)

### Vue 3
- [Vue 3官方文档](https://vuejs.org/)
- [Naive UI文档](https://www.naiveui.com/)

### LangChain
- [LangChain.js文档](https://js.langchain.com/)

---

## 🎯 下一步

完成以上步骤后，你将拥有：
- ✅ 可运行的Express后端
- ✅ PostgreSQL数据库集成
- ✅ LLM适配层（Claude）
- ✅ Vue 3前端
- ✅ 基础聊天功能

接下来可以：
1. 添加用户认证
2. 实现日程管理
3. 集成更多LLM
4. 添加Agent功能

---

## 💡 提示

- 遇到问题先Google
- 善用Claude/ChatGPT
- 加入Discord社区
- 记录开发过程

---

**祝你开发顺利！🚀**
