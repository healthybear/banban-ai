---
title: 术语表
version: 1.0
author: 产品团队
created: 2026-03-11
updated: 2026-03-11
status: approved
tags: [术语, 参考]
---

# 术语表

本文档定义了项目中使用的关键术语和概念。

## A

### Agent (智能体)
具有特定能力和职责的AI实体，能够理解任务、调用工具、做出决策。本项目中包括：
- **主Agent**: 负责理解用户意图、任务分解和结果整合
- **专业Agent**: 负责特定领域的任务执行（如日程管理Agent、信息检索Agent）

### Agent编排 (Agent Orchestration)
协调多个Agent协作完成复杂任务的机制，包括任务分配、执行顺序、结果聚合等。

### API适配层 (API Adapter Layer)
统一不同LLM提供商API接口的抽象层，使上层业务逻辑无需关心具体的模型实现。

## C

### Character Card (角色卡片)
定义AI助手人格特征的配置文件，包括性格、说话风格、背景故事等信息。

### Context Window (上下文窗口)
LLM一次能处理的最大token数量，决定了对话历史和输入内容的长度限制。

## E

### Embedding (向量嵌入)
将文本转换为高维向量的技术，用于语义相似度计算和检索。

## F

### Function Calling (函数调用)
LLM调用外部工具或API的能力，使AI能够执行实际操作而不仅仅是生成文本。

### Fine-tuning (微调)
在预训练模型基础上，使用特定数据集进行进一步训练，使模型适应特定任务。

## L

### LLM (Large Language Model, 大语言模型)
基于深度学习的大规模语言模型，如GPT、Claude、DeepSeek等。

### LoRA (Low-Rank Adaptation)
一种参数高效的模型微调方法，只训练少量参数即可适配新任务。

## M

### Multi-Agent System (多智能体系统)
由多个Agent协作完成任务的系统架构。

### Memory (记忆)
- **短期记忆**: 当前对话会话中的上下文信息
- **长期记忆**: 持久化存储的历史对话和重要信息

## P

### Personality Engine (个性化引擎)
负责赋予AI助手个性特征、管理长期记忆、实现个性化对话的模块。

### Plugin (插件)
扩展平台功能的独立模块，可以由第三方开发者编写。

### Prompt Engineering (提示词工程)
设计和优化输入提示词以获得更好的LLM输出的技术。

## R

### RAG (Retrieval-Augmented Generation, 检索增强生成)
结合信息检索和文本生成的技术，通过检索相关文档来增强LLM的回答质量。

## S

### Sandbox (沙箱)
隔离的执行环境，用于安全地运行插件代码，防止恶意操作。

### STT (Speech-to-Text, 语音转文字)
将语音输入转换为文本的技术。

### System Prompt (系统提示词)
定义AI助手行为和角色的初始指令。

## T

### Tool (工具)
Agent可以调用的外部功能，如API调用、数据库查询、文件操作等。

### TTS (Text-to-Speech, 文字转语音)
将文本转换为语音输出的技术。

### Token
LLM处理文本的基本单位，通常一个token约等于0.75个英文单词或0.5个中文字符。

## V

### Vector Database (向量数据库)
专门用于存储和检索向量嵌入的数据库，如Qdrant、Pinecone、Milvus等。

## W

### Workflow (工作流)
定义多个Agent和工具按特定顺序执行的流程图。

### WebSocket
一种支持双向实时通信的网络协议，用于实现流式响应和实时更新。

---

## 项目特定术语

### 酒馆API (Tavern API)
用于增强AI角色扮演能力的第三方服务，支持复杂的人格模拟和情感表达。

### 额度管理 (Quota Management)
监控和管理各个LLM提供商的免费额度，自动切换到有可用额度的模型。

### 插件沙箱 (Plugin Sandbox)
隔离插件执行环境，限制插件的资源访问和系统调用权限。

### 数据采集模块 (Data Collector)
收集用户对话和行为数据，用于后续的模型训练和优化。

### 工作流编排器 (Workflow Orchestrator)
可视化的Agent工作流设计和执行工具。

---

## 缩写对照表

| 缩写 | 全称 | 中文 |
|------|------|------|
| AI | Artificial Intelligence | 人工智能 |
| API | Application Programming Interface | 应用程序接口 |
| CRUD | Create, Read, Update, Delete | 增删改查 |
| ER | Entity-Relationship | 实体关系 |
| IDE | Integrated Development Environment | 集成开发环境 |
| JSON | JavaScript Object Notation | JavaScript对象表示法 |
| LLM | Large Language Model | 大语言模型 |
| MVP | Minimum Viable Product | 最小可行产品 |
| NLP | Natural Language Processing | 自然语言处理 |
| PWA | Progressive Web App | 渐进式Web应用 |
| RAG | Retrieval-Augmented Generation | 检索增强生成 |
| REST | Representational State Transfer | 表述性状态转移 |
| SDK | Software Development Kit | 软件开发工具包 |
| SSO | Single Sign-On | 单点登录 |
| STT | Speech-to-Text | 语音转文字 |
| TTS | Text-to-Speech | 文字转语音 |
| UI | User Interface | 用户界面 |
| UX | User Experience | 用户体验 |
| WASM | WebAssembly | Web汇编 |

---

## 相关文档
- [产品愿景](./vision.md)
- [系统架构](../02-design/architecture/)
- [API文档](../02-design/api/)

---

## 更新日志

### v1.0 - 2026-03-11
- 初始版本，定义核心术语
