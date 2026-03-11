# 任务清单

> 本文件为快速任务跟踪，详细规划请查看 [docs/01-requirements/SUMMARY.md](./docs/01-requirements/SUMMARY.md)

## 📍 当前阶段

**需求阶段** - 正在进行中

详见：[需求阶段工作总结](./docs/01-requirements/SUMMARY.md)

---

## 🔥 本周任务 (2026-03-11 - 2026-03-17)

### 学习阶段
- [ ] 学习NestJS基础（模块、控制器、服务）
  - [ ] 阅读NestJS官方文档
  - [ ] 了解依赖注入
  - [ ] 学习装饰器使用
- [ ] 学习MongoDB + Mongoose
  - [ ] 阅读Mongoose文档
  - [ ] 了解Schema定义
  - [ ] 学习CRUD操作

### 开发任务
- [ ] 搭建NestJS项目
  - [ ] 初始化NestJS项目
  - [ ] 配置TypeScript
  - [ ] 集成Mongoose
  - [ ] 设计基础Schema

---

## 📋 下周任务 (2026-03-18 - 2026-03-24)

- [ ] 实现LLM适配层
  - [ ] 定义接口
  - [ ] 实现Claude适配器
  - [ ] 实现DeepSeek适配器
  - [ ] 实现额度管理
- [ ] 实现基础对话API
  - [ ] 创建对话路由
  - [ ] 实现消息存储
  - [ ] 实现上下文管理
- [ ] 用户认证
  - [ ] 实现注册功能
  - [ ] 实现登录功能
  - [ ] JWT token生成

---

## 🎯 MVP 里程碑 (6个月)

详见：[产品路线图](./docs/00-project-overview/roadmap.md)

### Month 1-2: 后端基础
- [ ] NestJS + TypeScript项目搭建
- [ ] MongoDB + Mongoose集成
- [ ] 用户认证（Passport + JWT）
- [ ] LLM适配层（Claude + DeepSeek）
- [ ] 基础对话API

### Month 3-4: 前端基础
- [ ] Vue 3 + Vite项目搭建
- [ ] 聊天界面
- [ ] 用户登录/注册
- [ ] 日程管理界面
- [ ] 与后端联调

### Month 5: Agent系统
- [ ] 集成LangChain.js
- [ ] 实现日程管理Agent
- [ ] 工具调用（Function Calling）
- [ ] 简单的工作流

### Month 6: 完善和测试
- [ ] Bug修复
- [ ] 性能优化
- [ ] 部署上线
- [ ] 文档完善

---

## ✅ 已完成

### 2026-03-11
- [x] 项目立项和初步调研
- [x] 完成初始需求讨论
- [x] 确定技术栈（Vue + NestJS + Flutter）
- [x] 调整为单人开发模式
- [x] 创建完整的文档结构（80+目录）
- [x] 编写核心文档
- [x] 确定数据库方案（MongoDB分阶段）
- [x] 创建文档管理skill

---

## 📚 相关文档

- [产品愿景](./docs/00-project-overview/vision.md) - 了解项目目标
- [产品路线图](./docs/00-project-overview/roadmap.md) - 查看开发计划
- [需求总结](./docs/01-requirements/SUMMARY.md) - 需求阶段工作总结
- [技术选型](./docs/01-requirements/discussions/2026-03-11-solo-dev-adjustment.md) - 技术栈详细说明
- [项目进度](./PROGRESS.md) - 每日/每周进度记录

---

## 💡 提示

- 每天结束前更新此文件
- 完成任务立即标记 `[x]`
- 详细内容写在 docs/ 目录
- 使用 `Cmd/Ctrl + F` 搜索任务

---

**最后更新**: 2026-03-11
