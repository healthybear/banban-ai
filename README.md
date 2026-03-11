# 智能助手平台

> 一个支持多Agent协作、多LLM接入、个性化定制的智能助手管理平台

## 🎯 项目愿景

打造一个智能、灵活、可扩展的AI助手平台，让每个人都能拥有真正懂自己的个性化智能助手。

## ✨ 核心特性

- 🤖 **Multi-Agent协作** - 支持多个专业Agent协同工作
- 🔄 **多LLM适配** - 灵活切换模型，智能利用免费额度
- 🎭 **个性化引擎** - 真正的长期记忆和人格塑造
- 🔌 **开放插件生态** - 用户可以自己写插件扩展功能
- 📱 **多平台接入** - Web、移动端、浏览器插件、IDE插件、语音

## 📚 文档导航

### 快速开始
- [产品愿景](./docs/00-project-overview/vision.md) - 了解我们要做什么
- [产品路线图](./docs/00-project-overview/roadmap.md) - 查看开发计划
- [术语表](./docs/00-project-overview/glossary.md) - 理解关键概念

### 开发文档
- [需求文档](./docs/01-requirements/) - 产品需求和用户故事
- [设计文档](./docs/02-design/) - 系统架构和详细设计
- [开发指南](./docs/03-development/) - 开发环境和编码规范
- [测试文档](./docs/04-testing/) - 测试计划和用例

### 运维文档
- [部署文档](./docs/05-deployment/) - 部署指南和发布流程
- [运维文档](./docs/06-operations/) - 监控、日志、故障处理

### 用户文档
- [用户手册](./docs/07-user-docs/) - 使用指南和教程
- [插件开发](./docs/08-plugin-development/) - 插件开发指南

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                    多端接入层                                  │
│  Web App │ Mobile App │ Browser Extension │ IDE Plugin │ Voice │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (NestJS)                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  Agent编排    │  LLM适配层    │  个性化引擎   │  插件系统    │
└──────────────┴──────────────┴──────────────┴──────────────┘
                            ↓
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  PostgreSQL  │  Redis       │  Qdrant      │  对象存储    │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

## 🛠️ 技术栈

### 后端
- **框架**: NestJS (Node.js + TypeScript)
- **数据库**: PostgreSQL + Redis + Qdrant
- **消息队列**: BullMQ
- **WebSocket**: Socket.io

### 前端
- **框架**: React + Vite
- **样式**: TailwindCSS
- **状态管理**: Zustand
- **工作流编辑**: React Flow

### 移动端
- **框架**: React Native

### 部署
- **容器化**: Docker
- **编排**: Kubernetes (可选)
- **CI/CD**: GitHub Actions

## 📦 项目结构

```
assistant-platform/
├── packages/                    # Monorepo结构
│   ├── core/                   # 核心库
│   │   ├── llm-adapter/       # LLM适配层
│   │   ├── agent-engine/      # Agent编排引擎
│   │   ├── personality/       # 个性化引擎
│   │   ├── plugin-system/     # 插件系统
│   │   └── data-collector/    # 数据采集模块
│   │
│   ├── server/                # 后端服务
│   │   ├── api-gateway/       # API网关
│   │   ├── agent-service/     # Agent服务
│   │   └── llm-service/       # LLM调用服务
│   │
│   ├── web/                   # Web前端
│   │   ├── user-app/          # 用户端
│   │   └── admin-panel/       # 管理后台
│   │
│   ├── mobile/                # 移动端
│   ├── browser-extension/     # 浏览器插件
│   └── ide-plugins/           # IDE插件
│
├── plugins/                   # 插件生态
├── docs/                      # 文档
└── scripts/                   # 工具脚本
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6
- Docker (可选)

### 安装依赖
```bash
npm install
```

### 启动开发环境
```bash
npm run dev
```

### 运行测试
```bash
npm run test
```

## 📅 开发计划

### MVP (v0.1) - 3个月
- [x] 项目初始化
- [ ] 基础对话能力
- [ ] 日程管理
- [ ] LLM适配层
- [ ] Web界面

### v1.0 - 6个月
- [ ] Multi-Agent系统
- [ ] 个性化引擎
- [ ] 插件系统
- [ ] 可视化编排

### v2.0 - 12个月
- [ ] 移动端App
- [ ] 语音交互
- [ ] IDE集成
- [ ] 插件生态

详见 [产品路线图](./docs/00-project-overview/roadmap.md)

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献
1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 开发规范
- [编码规范](./docs/03-development/standards/coding-style.md)
- [Git规范](./docs/03-development/standards/git-workflow.md)
- [代码评审指南](./docs/03-development/standards/code-review-guide.md)

## 📝 许可证

[待定]

## 📮 联系我们

- 项目主页: [GitHub仓库地址]
- 问题反馈: [Issues]
- 讨论区: [Discussions]
- 邮件: [联系邮箱]

## 🙏 致谢

感谢所有贡献者和支持者！

---

**当前状态**: 🚧 开发中 | **版本**: v0.1.0-alpha | **最后更新**: 2026-03-11
