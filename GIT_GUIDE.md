# Git提交规范

## Commit Message格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type（必需）
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具变动
- `ci`: CI配置
- `build`: 构建系统

### Scope（可选）
模块名称，例如：
- `llm`: LLM适配层
- `chat`: 聊天功能
- `auth`: 认证
- `schedule`: 日程管理
- `agent`: Agent系统
- `plugin`: 插件系统
- `ui`: 用户界面
- `api`: API接口
- `db`: 数据库

### Subject（必需）
- 简短描述（50字符以内）
- 使用祈使句
- 首字母小写
- 结尾不加句号

### Body（可选）
- 详细描述改动
- 说明为什么改动
- 如何改动的

### Footer（可选）
- 关闭Issue: `Closes #123`
- 破坏性变更: `BREAKING CHANGE: 描述`

## 示例

### 好的提交
```bash
feat(llm): 实现Claude适配器

- 添加Claude API调用
- 实现额度检测
- 添加错误处理

Closes #1

---

fix(chat): 修复消息重复发送问题

当用户快速点击发送按钮时，会发送多条相同消息。
通过添加防抖处理解决此问题。

---

docs: 更新快速开始指南

添加了Prisma安装步骤和数据库配置说明

---

refactor(api): 重构路由结构

将所有路由移到routes目录，提高代码可维护性

---

perf(db): 优化数据库查询

添加索引，查询速度提升50%
```

### 不好的提交
```bash
# ❌ 太简单
update

# ❌ 不清楚
fix bug

# ❌ 中英文混杂
feat: 添加user authentication

# ❌ 太长
feat: add user authentication and authorization and also add password encryption and jwt token generation and validation

# ✅ 应该拆分成多个提交
feat(auth): 实现用户认证
feat(auth): 添加密码加密
feat(auth): 实现JWT token
```

## 分支命名规范

```
feature/功能名    - 新功能
fix/bug名        - Bug修复
docs/文档名      - 文档更新
refactor/模块名  - 重构
test/测试名      - 测试
chore/任务名     - 杂项
```

### 示例
```bash
feature/llm-adapter
feature/user-auth
fix/message-duplicate
fix/login-error
docs/api-reference
docs/quick-start
refactor/route-structure
test/llm-adapter
chore/update-deps
```

## Git工作流

### 日常开发
```bash
# 1. 同步主分支
git checkout main
git pull origin main

# 2. 创建功能分支
git checkout -b feature/llm-adapter

# 3. 开发...
# 编写代码

# 4. 提交
git add .
git commit -m "feat(llm): 实现Claude适配器"

# 5. 推送
git push origin feature/llm-adapter

# 6. 功能完成后合并
git checkout main
git merge feature/llm-adapter
git push origin main

# 7. 删除功能分支
git branch -d feature/llm-adapter
git push origin --delete feature/llm-adapter
```

### 快速提交（小改动）
```bash
# 直接在main分支提交
git add .
git commit -m "docs: 更新TODO"
git push origin main
```

### 紧急修复
```bash
# 1. 创建修复分支
git checkout -b fix/critical-bug

# 2. 修复
# 编写代码

# 3. 提交
git add .
git commit -m "fix(chat): 修复消息丢失问题"

# 4. 合并到main
git checkout main
git merge fix/critical-bug
git push origin main

# 5. 删除分支
git branch -d fix/critical-bug
```

## Git别名配置

在 `~/.gitconfig` 添加：

```ini
[alias]
    # 常用命令简写
    st = status
    co = checkout
    br = branch
    ci = commit
    cm = commit -m
    ca = commit --amend

    # 查看日志
    lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

    # 撤销
    undo = reset --soft HEAD^

    # 同步
    sync = !git pull origin main && git push origin main

    # 清理
    cleanup = !git branch --merged | grep -v '\\*\\|main\\|master' | xargs -n 1 git branch -d
```

使用：
```bash
git st          # 等同于 git status
git cm "message" # 等同于 git commit -m "message"
git lg          # 美化的日志
git sync        # 同步main分支
git cleanup     # 清理已合并的分支
```

## .gitignore

```gitignore
# 依赖
node_modules/
.pnp
.pnp.js

# 测试
coverage/
*.log

# 生产
dist/
build/

# 环境变量
.env
.env.local
.env.*.local

# 编辑器
.vscode/
.idea/
*.swp
*.swo
*~

# 操作系统
.DS_Store
Thumbs.db

# 临时文件
*.tmp
*.temp
.cache/

# 数据库
*.db
*.sqlite

# 备份
*.backup
*.bak
```

## 提交前检查清单

- [ ] 代码能正常运行
- [ ] 没有console.log调试代码
- [ ] 没有注释掉的代码
- [ ] 格式化了代码
- [ ] 更新了相关文档
- [ ] 更新了TODO.md
- [ ] Commit message符合规范
- [ ] 没有提交敏感信息（密钥、密码）

## 常见问题

### 1. 提交了错误的代码
```bash
# 撤销最后一次提交（保留改动）
git reset --soft HEAD^

# 撤销最后一次提交（丢弃改动）
git reset --hard HEAD^
```

### 2. 修改最后一次提交
```bash
# 修改提交信息
git commit --amend -m "新的提交信息"

# 添加遗漏的文件
git add forgotten_file
git commit --amend --no-edit
```

### 3. 合并多个提交
```bash
# 合并最近3个提交
git rebase -i HEAD~3

# 在编辑器中将pick改为squash
```

### 4. 暂存当前工作
```bash
# 暂存
git stash

# 恢复
git stash pop

# 查看暂存列表
git stash list
```

### 5. 查看改动
```bash
# 查看未暂存的改动
git diff

# 查看已暂存的改动
git diff --staged

# 查看某个文件的改动
git diff filename
```

## 相关文档

- [项目管理方案](./docs/03-development/project-management.md)
- [TODO.md](./TODO.md)
- [PROGRESS.md](./PROGRESS.md)
- [CHANGELOG.md](./CHANGELOG.md)
