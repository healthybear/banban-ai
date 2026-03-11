---
title: 项目进度管理方案
version: 1.0
author: 项目负责人
created: 2026-03-11
updated: 2026-03-11
status: approved
tags: [项目管理, 进度跟踪, 多设备]
---

# 项目进度管理方案 - 多设备协同

## 核心原则

1. **Git为中心** - 所有内容都提交到Git
2. **文档驱动** - 进度、任务、决策都记录在文档中
3. **自动同步** - 利用GitHub自动同步
4. **简单实用** - 不要过度设计

---

## 方案一：基于Git + Markdown（推荐）

### 优点
- ✅ 完全免费
- ✅ 跨设备自动同步
- ✅ 版本控制
- ✅ 任何编辑器都能用
- ✅ 可以离线工作

### 项目结构

```
assistant-platform/
├── .github/
│   └── workflows/          # GitHub Actions
├── docs/                   # 文档（已有）
├── packages/               # 代码
├── TODO.md                 # 当前任务清单
├── PROGRESS.md             # 进度记录
├── CHANGELOG.md            # 变更日志
└── .vscode/
    └── tasks.json          # VS Code任务配置
```

---

## 核心文件说明

### 1. TODO.md - 任务清单

```markdown
# 任务清单

> 最后更新: 2026-03-11 20:00

## 🔥 进行中 (In Progress)

- [ ] 搭建Express后端项目 (2026-03-11 开始)
  - [x] 初始化项目
  - [x] 配置TypeScript
  - [ ] 集成Prisma
  - [ ] 实现LLM适配层

## 📋 待办 (Todo)

### 本周任务
- [ ] 学习Express进阶知识
- [ ] 学习Prisma基础
- [ ] 设计数据库Schema

### 下周任务
- [ ] 实现用户认证
- [ ] 实现对话API
- [ ] 前端项目搭建

## ✅ 已完成 (Done)

### 2026-03-11
- [x] 完成需求讨论
- [x] 确定技术栈
- [x] 创建文档结构

### 2026-03-10
- [x] 项目立项
- [x] 初步调研

## 🚫 已取消 (Cancelled)

- [x] ~~使用NestJS~~ (改用Express)

## 📝 备注

- 每天结束前更新进度
- 每周日回顾和规划
- 遇到问题记录在这里
```

---

### 2. PROGRESS.md - 进度记录

```markdown
# 项目进度记录

## 2026年3月

### Week 1 (3月11日 - 3月17日)

**本周目标**:
- 搭建后端基础框架
- 学习Express和Prisma

**实际进展**:
- ✅ 完成需求讨论和技术选型
- ✅ 创建文档结构
- 🔄 正在搭建Express项目
- ⏸️ Prisma集成待完成

**遇到的问题**:
- TypeScript配置有些复杂，花了1小时
- Prisma迁移命令不熟悉

**解决方案**:
- 参考官方文档
- 用Claude帮忙解决

**下周计划**:
- 完成Prisma集成
- 实现LLM适配层
- 接入Claude API

**工作时间**: 8小时
- 周一: 2小时（需求讨论）
- 周二: 0小时（休息）
- 周三: 3小时（文档编写）
- 周四: 0小时（加班）
- 周五: 3小时（代码搭建）
- 周六: 计划4小时
- 周日: 计划2小时

---

### Week 2 (3月18日 - 3月24日)

**本周目标**:
- TBD

...
```

---

### 3. CHANGELOG.md - 变更日志

```markdown
# 变更日志

所有重要的项目变更都会记录在这里。

格式遵循 [Keep a Changelog](https://keepachangelog.com/)

## [Unreleased]

### Added
- 项目进度管理方案文档

### Changed
- 技术栈从NestJS改为Express

### Fixed
- 无

## [0.1.0] - 2026-03-11

### Added
- 初始化项目
- 创建文档结构
- 完成需求讨论

### Decisions
- 确定使用Express + Vue 3 + Flutter
- 确定单人开发模式
- 确定使用免费工具
```

---

## 方案二：GitHub Projects（推荐作为补充）

### 优点
- ✅ 可视化看板
- ✅ 自动同步
- ✅ 移动端App
- ✅ 完全免费

### 设置步骤

#### 1. 创建GitHub Project
```
1. 进入你的GitHub仓库
2. 点击 "Projects" 标签
3. 点击 "New project"
4. 选择 "Board" 模板
5. 命名为 "智能助手开发"
```

#### 2. 配置看板列
```
- 📋 Backlog (待办)
- 🎯 This Week (本周)
- 🔥 In Progress (进行中)
- 👀 Review (待审查)
- ✅ Done (已完成)
```

#### 3. 创建任务
```
每个任务作为一个Issue:
- 标题: 简短描述
- 描述: 详细说明
- 标签: feature/bug/docs/chore
- 里程碑: MVP/v1.0/v2.0
- 分配给: 自己
```

#### 4. 移动端使用
```
下载GitHub App:
- iOS: App Store搜索"GitHub"
- Android: Google Play搜索"GitHub"

随时随地查看和更新任务
```

---

## 方案三：Notion（可选）

### 优点
- ✅ 功能强大
- ✅ 多设备同步
- ✅ 免费版够用
- ✅ 可以嵌入文档

### 设置步骤

#### 1. 创建Workspace
```
1. 注册Notion账号
2. 创建新页面 "智能助手项目"
```

#### 2. 创建数据库
```
任务数据库:
- 名称 (Title)
- 状态 (Select): Todo/In Progress/Done
- 优先级 (Select): P0/P1/P2
- 开始日期 (Date)
- 截止日期 (Date)
- 标签 (Multi-select)
- 描述 (Text)
```

#### 3. 创建视图
```
- 看板视图: 按状态分组
- 日历视图: 按日期查看
- 列表视图: 全部任务
- 时间线视图: 甘特图
```

---

## 推荐的组合方案

### 日常使用
```
Git + Markdown (主要)
    ↓
GitHub Projects (可视化)
    ↓
Notion (可选，详细规划)
```

### 工作流程

#### 每天开始
1. 打开 `TODO.md` 查看今天的任务
2. 在GitHub Projects移动任务到"In Progress"
3. 开始编码

#### 每天结束
1. 提交代码到Git
2. 更新 `TODO.md` 的进度
3. 在GitHub Projects移动完成的任务到"Done"
4. 简单记录今天的工作（可选）

#### 每周日
1. 更新 `PROGRESS.md` 的周报
2. 回顾本周完成情况
3. 规划下周任务
4. 更新 `TODO.md` 的下周任务

#### 每月初
1. 写月度总结
2. 更新 `CHANGELOG.md`
3. 调整路线图（如需要）

---

## 多设备同步方案

### 场景1: 在公司电脑开发

```bash
# 早上到公司
git pull origin main

# 开发...

# 下班前提交
git add .
git commit -m "feat: 实现LLM适配层"
git push origin main
```

### 场景2: 回家继续开发

```bash
# 到家后
git pull origin main

# 继续开发...

# 睡前提交
git add .
git commit -m "feat: 完成Claude适配器"
git push origin main
```

### 场景3: 在咖啡厅用笔记本

```bash
# 到咖啡厅
git pull origin main

# 开发...

# 离开前提交
git add .
git commit -m "docs: 更新API文档"
git push origin main
```

### 场景4: 手机上查看进度

```
1. 打开GitHub App
2. 查看Projects看板
3. 查看最新Commits
4. 查看TODO.md文件
5. 添加新的Issue（如果想到新功能）
```

---

## Git提交规范

### Commit Message格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type类型
```
feat:     新功能
fix:      Bug修复
docs:     文档更新
style:    代码格式（不影响功能）
refactor: 重构
test:     测试
chore:    构建/工具变动
```

### 示例
```bash
# 好的提交
git commit -m "feat(llm): 实现Claude适配器"
git commit -m "fix(chat): 修复消息重复发送问题"
git commit -m "docs: 更新快速开始指南"

# 不好的提交
git commit -m "update"
git commit -m "fix bug"
git commit -m "修改代码"
```

---

## 分支管理策略

### 简化的分支策略（单人开发）

```
main (主分支)
  ↓
feature/xxx (功能分支)
  ↓
合并回main
```

### 工作流程

```bash
# 开发新功能
git checkout -b feature/llm-adapter
# 开发...
git add .
git commit -m "feat: 实现LLM适配层"
git push origin feature/llm-adapter

# 功能完成后合并
git checkout main
git merge feature/llm-adapter
git push origin main

# 删除功能分支
git branch -d feature/llm-adapter
git push origin --delete feature/llm-adapter
```

### 分支命名规范
```
feature/功能名    - 新功能
fix/bug名        - Bug修复
docs/文档名      - 文档更新
refactor/模块名  - 重构
```

---

## 编辑器配置同步

### VS Code设置同步

#### 方法1: Settings Sync（推荐）
```
1. 登录GitHub账号
2. 启用Settings Sync
3. 选择要同步的内容:
   - Settings
   - Keybindings
   - Extensions
   - Snippets
4. 所有设备自动同步
```

#### 方法2: 配置文件提交到Git
```
.vscode/
├── settings.json      # 项目设置
├── extensions.json    # 推荐扩展
└── tasks.json        # 任务配置

提交到Git，所有设备共享
```

### Cursor配置
```
Cursor会自动同步设置到云端
登录同一个账号即可
```

### 其他编辑器
```
WebStorm: 使用JetBrains Account同步
Sublime: 使用Package Control同步
Vim: .vimrc提交到Git
```

---

## 时间追踪（可选）

### 方案1: 手动记录
```markdown
# TIME_LOG.md

## 2026-03-11
- 09:00-10:30 需求讨论 (1.5h)
- 14:00-17:00 文档编写 (3h)
- 20:00-22:00 代码搭建 (2h)

总计: 6.5小时
```

### 方案2: WakaTime（推荐）
```
1. 安装WakaTime插件
2. 注册账号
3. 自动追踪编码时间
4. 查看统计报告

免费版功能够用
```

### 方案3: Toggl Track
```
1. 注册Toggl账号
2. 创建项目
3. 手动开始/停止计时
4. 查看时间报告

免费版够用
```

---

## 备份策略

### 代码备份
```
主仓库: GitHub
镜像1: Gitee（国内访问快）
镜像2: GitLab（备用）

自动同步脚本:
git push origin main
git push gitee main
git push gitlab main
```

### 文档备份
```
主存储: Git仓库
备份1: Notion（导入Markdown）
备份2: 本地硬盘
备份3: 云盘（OneDrive/iCloud）
```

### 数据库备份
```
开发环境: 每天自动备份
生产环境: 每小时自动备份

备份脚本:
pg_dump > backup_$(date +%Y%m%d).sql
```

---

## 实用工具推荐

### 项目管理
- **GitHub Projects** - 免费，集成好
- **Notion** - 功能强大
- **Trello** - 简单直观

### 时间追踪
- **WakaTime** - 自动追踪编码时间
- **Toggl** - 手动计时
- **RescueTime** - 全局时间追踪

### 笔记工具
- **Obsidian** - Markdown笔记，本地存储
- **Notion** - 在线协作
- **Typora** - Markdown编辑器

### 代码片段
- **SnippetsLab** (Mac) - 代码片段管理
- **Gist** (GitHub) - 在线代码片段
- **VS Code Snippets** - 编辑器内置

---

## 移动端工作流

### 查看进度
```
GitHub App:
- 查看Projects看板
- 查看最新Commits
- 查看Issues
- 查看Pull Requests
```

### 记录想法
```
方法1: GitHub Issues
- 随时创建新Issue
- 添加标签和描述

方法2: Notion App
- 快速记录想法
- 稍后整理

方法3: 备忘录
- 临时记录
- 回到电脑后整理到Git
```

### 代码审查
```
GitHub App:
- 查看代码diff
- 添加评论
- 批准/请求修改
```

---

## 最佳实践

### 1. 每天提交
```
- 即使代码没写完也要提交
- 使用WIP标记: "WIP: 正在实现LLM适配层"
- 保持Git历史连续
```

### 2. 写好Commit Message
```
- 清晰描述做了什么
- 遵循规范格式
- 方便以后查找
```

### 3. 定期同步
```
- 每次开始工作前: git pull
- 每次结束工作后: git push
- 避免冲突
```

### 4. 文档先行
```
- 先更新TODO.md
- 再开始编码
- 完成后更新PROGRESS.md
```

### 5. 周期性回顾
```
- 每周日: 写周报
- 每月初: 写月报
- 每季度: 回顾路线图
```

---

## 示例工作流

### 周一早上
```bash
# 1. 同步代码
git pull origin main

# 2. 查看本周任务
cat TODO.md

# 3. 创建功能分支
git checkout -b feature/user-auth

# 4. 开始编码
code .
```

### 周一晚上
```bash
# 1. 提交代码
git add .
git commit -m "feat(auth): 实现用户注册功能"
git push origin feature/user-auth

# 2. 更新进度
vim TODO.md
# 标记完成的任务

# 3. 提交文档
git add TODO.md
git commit -m "docs: 更新任务进度"
git push origin main
```

### 周日晚上
```bash
# 1. 写周报
vim PROGRESS.md
# 添加本周总结

# 2. 规划下周
vim TODO.md
# 添加下周任务

# 3. 提交
git add .
git commit -m "docs: 第1周周报和第2周计划"
git push origin main
```

---

## 总结

### 推荐方案
```
核心: Git + Markdown
可视化: GitHub Projects
详细规划: Notion（可选）
时间追踪: WakaTime（可选）
```

### 核心文件
```
TODO.md      - 任务清单（每天更新）
PROGRESS.md  - 进度记录（每周更新）
CHANGELOG.md - 变更日志（有变更就更新）
```

### 关键习惯
```
1. 每天提交代码
2. 每天更新TODO
3. 每周写周报
4. 每月写月报
```

---

## 相关文档
- [团队组织](../../00-project-overview/team.md)
- [快速开始](../QUICK-START.md)
- [单人开发调整](./2026-03-11-solo-dev-adjustment.md)

---

**记住**: 工具是为了提高效率，不要让工具管理占用太多时间。选择最适合自己的方案，保持简单实用。
