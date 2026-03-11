# 变更日志

所有重要的项目变更都会记录在这里。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

## [Unreleased]

### Added
- 项目进度管理方案
- TODO.md 任务清单
- PROGRESS.md 进度记录
- CHANGELOG.md 变更日志

### Changed
- 无

### Deprecated
- 无

### Removed
- 无

### Fixed
- 无

### Security
- 无

---

## [0.1.0] - 2026-03-11

### Added
- 初始化项目仓库
- 创建完整的文档结构（80+目录）
- 编写核心文档：
  - 产品愿景文档
  - 产品路线图
  - 术语表
  - 团队组织文档（单人开发版）
  - 初始需求讨论记录
  - 技术选型更新文档
  - 单人开发调整文档
  - 需求规划与优先级
  - 快速开始指南
  - 项目管理方案
- 创建文档模板：
  - 通用文档模板
  - 会议记录模板
  - PRD模板

### Decisions
- **技术栈确定**:
  - 前端: Vue 3 + Vite + Naive UI
  - 后端: Express + TypeScript + Prisma
  - 移动端: Flutter + Kotlin Compose
  - 数据库: PostgreSQL + Redis + Qdrant
  - Agent: LangChain.js
- **开发模式**: 单人开发，业余时间
- **成本策略**: 使用免费开源工具
- **动态扩展方案**:
  - Web: 动态组件 + WASM
  - 后端: 远程插件 + 本地插件
  - 移动端: 小程序 + 热更新
- **MVP范围**: 基础对话 + 日程管理 + LLM适配 + Web界面
- **时间规划**: 6个月完成MVP

### Changed
- 后端框架从NestJS改为Express（学习成本低）
- 前端框架从React改为Vue 3（更熟悉）
- 团队模式从多人改为单人开发

### Removed
- 移除了NestJS相关规划
- 移除了React相关规划
- 移除了多人团队的复杂流程

---

## 版本说明

### 版本号规则
遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 里程碑版本
- **v0.1.0**: 项目初始化，文档阶段
- **v0.2.0**: 后端基础框架完成
- **v0.3.0**: LLM适配层完成
- **v0.4.0**: 前端基础完成
- **v0.5.0**: 基础对话功能完成
- **v0.6.0**: 日程管理完成
- **v1.0.0**: MVP发布
- **v2.0.0**: Multi-Agent + 插件系统
- **v3.0.0**: 移动端 + 语音交互

---

## 更新规范

### 何时更新
- 完成一个功能模块
- 修复重要Bug
- 做出重要决策
- 发布新版本

### 如何更新
1. 在 `[Unreleased]` 下添加变更
2. 发布版本时，将 `[Unreleased]` 内容移到新版本下
3. 添加版本号和日期
4. 清空 `[Unreleased]` 部分

### 示例
```markdown
## [Unreleased]

### Added
- 新功能描述

### Fixed
- Bug修复描述

---

## [0.2.0] - 2026-03-20

### Added
- 完成Express后端框架搭建
- 集成Prisma ORM
- 实现用户认证

### Changed
- 优化数据库Schema设计
```

---

## 相关链接

- [产品路线图](./docs/00-project-overview/roadmap.md)
- [需求规划](./docs/01-requirements/requirements/requirements-planning.md)
- [任务清单](./TODO.md)
- [进度记录](./PROGRESS.md)
