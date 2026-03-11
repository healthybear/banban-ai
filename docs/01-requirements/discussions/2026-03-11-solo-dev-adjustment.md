---
title: 团队与技术栈调整
version: 1.2
author: 项目负责人
created: 2026-03-11
updated: 2026-03-11
status: approved
tags: [团队, 技术栈, 调整]
---

# 团队与技术栈调整 - 单人开发版

**会议时间**: 2026-03-11 (晚上)
**讨论人**: 项目负责人
**会议类型**: 实际情况调整
**记录人**: 项目负责人

---

## 实际情况

### 团队现状
- **当前团队**: 1人（全栈开发）
- **技能栈**:
  - 前端: Vue（熟悉）
  - 后端: Express（有基础，小功能经验）
  - 移动端: Flutter、Kotlin、Compose（熟悉）
  - 其他: WASM、Kotlin编译

### 资源限制
- **时间**: 业余时间开发
- **预算**: 尽量使用免费工具
- **要求**: 可商用的开源工具

---

## 技术栈重新调整

### 1. 后端技术栈调整

#### 原方案
❌ NestJS - 学习成本高，对一个人来说太重

#### 新方案
✅ **Express + TypeScript**

**理由**:
1. **你已经有经验** - 用过Express，上手快
2. **轻量级** - 不需要学习复杂的依赖注入
3. **生态成熟** - 中间件丰富
4. **够用** - MVP阶段完全够用

**技术栈**:
```
后端核心:
- Express (Web框架)
- TypeScript (类型安全)
- ts-node-dev (开发热重载)

数据库:
- PostgreSQL (免费开源，可商用)
- Redis (免费开源，可商用)
- Qdrant (免费开源，可商用)

ORM:
- Prisma (免费，类型安全，易用)

认证:
- Passport.js (免费)
- JWT (免费)

任务队列:
- Bull (基于Redis，免费)

WebSocket:
- Socket.io (免费)
```

---

### 2. 前端技术栈确认

✅ **Vue 3 + Vite + TypeScript**

**理由**:
- 你熟悉Vue
- Vue 3学习曲线平缓
- Vite开箱即用

**技术栈**:
```
前端核心:
- Vue 3 (Composition API)
- Vite (构建工具)
- TypeScript (类型安全)
- Pinia (状态管理，比Vuex简单)

UI框架:
- Naive UI (免费，MIT协议，组件丰富)
  或
- Element Plus (免费，MIT协议，文档好)

工具库:
- VueUse (免费，实用hooks)
- Day.js (免费，日期处理)
- Axios (免费，HTTP客户端)

工作流编辑:
- Vue Flow (免费，MIT协议)
  或
- 先不做可视化，用JSON配置
```

---

### 3. 移动端技术栈确认

✅ **Flutter**

**理由**:
- 你熟悉Flutter
- 跨平台，一套代码
- 社区活跃

**技术栈**:
```
移动端:
- Flutter + Dart
- Provider / Riverpod (状态管理)
- Dio (HTTP客户端)
- Hive (本地存储，免费)

Android原生:
- Kotlin + Compose (需要时)
- Platform Channel (与Flutter通信)
```

---

### 4. 数据库选型（全部免费可商用）

✅ **PostgreSQL + Redis + Qdrant**

**理由**:
- 全部开源免费
- 可商用
- 功能强大

**部署方案**:
```
开发环境:
- Docker Compose 本地运行

生产环境:
- 自建服务器（最便宜）
  或
- 云服务免费套餐:
  - Supabase (PostgreSQL免费500MB)
  - Upstash (Redis免费10K命令/天)
  - Qdrant Cloud (免费1GB)
```

---

### 5. AI工具辅助开发

#### 代码生成
- **Cursor** (免费版 + Pro可选)
- **GitHub Copilot** (学生免费 / $10/月)
- **Claude Code** (当前使用)

#### 代码审查
- **Claude** (帮你review代码)
- **ChatGPT** (免费版够用)

#### 文档生成
- **Claude** (生成文档)
- **Mintlify** (免费，文档站点)

#### 测试生成
- **Claude** (生成测试用例)
- **Vitest** (免费，测试框架)

---

### 6. Agent Skills扩展能力

#### 方案：使用现成的Agent框架

##### 选项1: LangChain.js (推荐)
```typescript
// 免费开源，MIT协议
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { pull } from "langchain/hub";

// 定义工具
const tools = [
  {
    name: "get_weather",
    description: "Get weather information",
    func: async (city: string) => {
      // 调用天气API
    }
  }
];

// 创建Agent
const agent = await createOpenAIFunctionsAgent({
  llm: new ChatOpenAI(),
  tools,
  prompt: await pull("hwchase17/openai-functions-agent")
});

const executor = new AgentExecutor({
  agent,
  tools,
});
```

**优点**:
- 免费开源
- 社区活跃
- 文档完善
- 支持多种LLM
- 内置很多工具

##### 选项2: 自己简单实现
```typescript
// 如果LangChain太重，自己实现一个轻量版
class SimpleAgent {
  constructor(
    private llm: LLMAdapter,
    private tools: Tool[]
  ) {}

  async execute(userInput: string) {
    // 1. 让LLM决定调用哪个工具
    const decision = await this.llm.chat({
      messages: [
        { role: 'system', content: this.buildSystemPrompt() },
        { role: 'user', content: userInput }
      ],
      tools: this.tools.map(t => t.definition)
    });

    // 2. 执行工具
    if (decision.toolCalls) {
      const results = await Promise.all(
        decision.toolCalls.map(call =>
          this.executeTool(call.name, call.arguments)
        )
      );

      // 3. 让LLM总结结果
      return this.llm.chat({
        messages: [
          ...previousMessages,
          { role: 'assistant', content: decision.content, toolCalls: decision.toolCalls },
          { role: 'tool', content: JSON.stringify(results) }
        ]
      });
    }

    return decision.content;
  }
}
```

---

### 7. 外部工具辅助

#### 开发工具（免费）
- **VS Code** (免费)
- **Cursor** (免费版)
- **Postman** (免费版，API测试)
- **DBeaver** (免费，数据库管理)

#### 设计工具（免费）
- **Figma** (免费版，3个项目)
- **Excalidraw** (免费，画图)
- **draw.io** (免费，流程图)

#### 项目管理（免费）
- **Notion** (免费版，个人够用)
- **GitHub Projects** (免费)
- **Trello** (免费版)

#### 监控工具（免费）
- **Sentry** (免费5K错误/月)
- **Uptime Robot** (免费50个监控)
- **Google Analytics** (免费)

#### CI/CD（免费）
- **GitHub Actions** (免费2000分钟/月)
- **Vercel** (免费，前端部署)
- **Railway** (免费$5额度/月，后端部署)

---

## MVP范围重新调整（单人开发）

### 时间规划：6个月（业余时间）

#### Month 1-2: 后端基础
- [ ] Express + TypeScript项目搭建
- [ ] PostgreSQL + Prisma集成
- [ ] 用户认证（Passport + JWT）
- [ ] LLM适配层（Claude + DeepSeek）
- [ ] 基础对话API

#### Month 3-4: 前端基础
- [ ] Vue 3 + Vite项目搭建
- [ ] 聊天界面
- [ ] 用户登录/注册
- [ ] 日程管理界面
- [ ] 与后端联调

#### Month 5: Agent系统
- [ ] 集成LangChain.js
- [ ] 实现日程管理Agent
- [ ] 工具调用（Function Calling）
- [ ] 简单的工作流

#### Month 6: 完善和测试
- [ ] Bug修复
- [ ] 性能优化
- [ ] 部署上线
- [ ] 文档完善

---

## 简化的架构

```
┌─────────────────────────────────────┐
│         Vue 3 前端                   │
│  (Naive UI + Pinia + Axios)         │
└─────────────────────────────────────┘
              ↓ HTTP/WebSocket
┌─────────────────────────────────────┐
│      Express + TypeScript            │
│  ┌──────────┬──────────┬──────────┐ │
│  │ LLM适配  │ Agent    │ 日程管理  │ │
│  │ 层       │ 系统     │          │ │
│  └──────────┴──────────┴──────────┘ │
└─────────────────────────────────────┘
              ↓
┌──────────┬──────────┬──────────────┐
│PostgreSQL│  Redis   │   Qdrant     │
│(Prisma)  │  (Bull)  │  (向量DB)    │
└──────────┴──────────┴──────────────┘
```

---

## 成本估算（最小化）

### 开发阶段（免费）
- 开发工具: 全部免费
- 本地开发: Docker Compose
- 代码托管: GitHub (免费)
- CI/CD: GitHub Actions (免费额度)

### 生产环境（最低成本）

#### 方案A: 全部云服务免费套餐
```
- 前端: Vercel (免费)
- 后端: Railway (免费$5/月)
- 数据库: Supabase (免费500MB)
- Redis: Upstash (免费10K命令/天)
- 向量DB: Qdrant Cloud (免费1GB)
- 监控: Sentry (免费5K错误/月)

总成本: $0/月
```

#### 方案B: 自建服务器（推荐）
```
- VPS: 腾讯云/阿里云轻量服务器
  - 2核2G: ¥50-80/月
  - 自建所有服务
  - 完全可控

总成本: ¥50-80/月 (约$7-12/月)
```

#### 方案C: 混合方案
```
- 前端: Vercel (免费)
- 后端: 自建VPS (¥50/月)
- 数据库: 自建在VPS上

总成本: ¥50/月 (约$7/月)
```

---

## LLM API成本优化

### 免费额度利用
```
Claude:
- 免费额度: 具体查看官网
- 策略: 优先使用

DeepSeek:
- 免费额度: 具体查看官网
- 策略: Claude额度用完切换

Kimi:
- 免费额度: 具体查看官网
- 策略: 备用

豆包:
- 免费额度: 具体查看官网
- 策略: 备用
```

### 成本控制策略
1. **智能切换**: 自动使用有免费额度的模型
2. **缓存**: 相同问题缓存结果
3. **限流**: 单用户请求频率限制
4. **压缩**: 优化Prompt长度

---

## 开发优先级调整（单人）

### 第一优先级（必须做）
1. ✅ LLM适配层 - 核心能力
2. ✅ 基础对话 - 核心功能
3. ✅ 用户认证 - 必需
4. ✅ 简单的日程管理 - 展示能力

### 第二优先级（重要但可延后）
1. ⏸️ Agent系统 - 可以先简单实现
2. ⏸️ 插件系统 - v1.0再做
3. ⏸️ 个性化 - v1.0再做

### 第三优先级（后续版本）
1. ⏸️ 移动端 - v2.0
2. ⏸️ 语音 - v2.0
3. ⏸️ 可视化编排 - v2.0

---

## 技术学习路径

### 需要学习的（优先级排序）
1. **Express进阶** (1周)
   - 中间件机制
   - 错误处理
   - 路由组织
   - TypeScript集成

2. **Prisma ORM** (3天)
   - Schema定义
   - 迁移管理
   - CRUD操作
   - 关系查询

3. **LangChain.js** (1周)
   - 基础概念
   - Agent创建
   - 工具集成
   - Prompt工程

4. **WebSocket** (3天)
   - Socket.io基础
   - 实时通信
   - 房间管理

### 可以边做边学
- Bull队列
- Redis操作
- Qdrant使用
- 部署运维

---

## 风险与应对（单人开发）

### 主要风险

| 风险 | 影响 | 概率 | 应对 |
|------|------|------|------|
| 时间不足 | 高 | 高 | 缩减MVP范围 |
| 技术难点卡住 | 高 | 中 | 使用AI辅助，社区求助 |
| 精力不足 | 中 | 中 | 合理安排，不要太赶 |
| 服务器成本 | 低 | 低 | 用免费套餐 |

### 应对策略
1. **MVP最小化**: 只做核心功能
2. **使用现成方案**: 不重复造轮子
3. **AI辅助开发**: Cursor + Claude
4. **社区求助**: GitHub Issues、Discord
5. **迭代开发**: 小步快跑

---

## 调整后的技术栈总结

| 层级 | 技术选型 | 理由 | 成本 |
|------|----------|------|------|
| 前端 | Vue 3 + Vite | 你熟悉 | 免费 |
| 后端 | Express + TS | 你有基础 | 免费 |
| 数据库 | PostgreSQL | 免费开源 | 免费 |
| 缓存 | Redis | 免费开源 | 免费 |
| 向量DB | Qdrant | 免费开源 | 免费 |
| ORM | Prisma | 免费，易用 | 免费 |
| Agent | LangChain.js | 免费开源 | 免费 |
| 移动端 | Flutter | 你熟悉 | 免费 |
| 部署 | Vercel+Railway | 免费套餐 | 免费 |
| 监控 | Sentry | 免费套餐 | 免费 |

**总成本**: $0 - $12/月（看部署方案）

---

## 下一步行动

### 本周
- [ ] 学习Express + TypeScript基础
- [ ] 搭建Express项目骨架
- [ ] 配置Prisma + PostgreSQL
- [ ] 实现简单的用户认证

### 下周
- [ ] 实现LLM适配层
- [ ] 接入Claude API
- [ ] 实现基础对话功能
- [ ] 测试多轮对话

### 第三周
- [ ] 搭建Vue 3前端
- [ ] 实现聊天界面
- [ ] 前后端联调
- [ ] WebSocket实时通信

---

## 相关文档
- [需求规划](../requirements/requirements-planning.md)
- [产品路线图](../../00-project-overview/roadmap.md)
- [技术选型讨论](./2026-03-11-tech-stack-update.md)

---

**更新时间**: 2026-03-11
**状态**: ✅ 已根据实际情况调整
