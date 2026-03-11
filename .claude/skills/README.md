# 文档管理 Skills

这些skills帮助你高效管理项目文档，节省token，快速查找和操作文档。

## 📚 可用的Skills

### 1. `/doc-search` - 搜索文档
快速搜索项目文档，支持关键词、标签、类别搜索。

**使用场景**:
- 不知道某个信息在哪个文档
- 想找所有关于某个主题的文档
- 快速定位相关内容

**示例**:
```bash
/doc-search LLM
/doc-search 需求
/doc-search 技术栈
```

---

### 2. `/doc-summary` - 文档摘要
快速获取文档的核心内容摘要，不读取完整内容。

**使用场景**:
- 想快速了解文档概况
- 不确定是否需要读取完整文档
- 批量查看多个文档的摘要

**示例**:
```bash
/doc-summary vision
/doc-summary requirements-planning
/doc-summary docs/00-project-overview/roadmap.md
```

**优势**: 节省90%的token（只读取前100行）

---

### 3. `/doc-section` - 读取章节
只读取文档的特定章节，避免读取整个文档。

**使用场景**:
- 只需要文档的某一部分
- 文档很大（>20KB）
- 想快速定位特定信息

**示例**:
```bash
/doc-section vision 目标用户
/doc-section requirements-planning MVP
/doc-section tech-stack-update 后端技术栈
```

**优势**: 节省80%的token（只读取需要的章节）

---

### 4. `/doc-create` - 创建大文档
创建大文档，自动分段生成，避免超出Claude输出限制。

**使用场景**:
- 需要创建完整的PRD文档
- 需要创建技术设计文档
- 需要创建API文档

**示例**:
```bash
/doc-create PRD LLM适配层
/doc-create 设计文档 Agent编排系统
/doc-create API 聊天接口
```

**优势**:
- 避免超出输出限制
- 结构化生成，质量更高
- 自动使用模板

---

### 5. `/doc-update` - 更新文档
更新大文档的特定部分，避免重写整个文档。

**使用场景**:
- 需要修改文档的某个章节
- 需要添加新内容
- 需要删除过时内容

**示例**:
```bash
/doc-update vision 目标用户 添加企业用户画像
/doc-update requirements-planning MVP 添加WebSocket需求
/doc-update tech-stack-update 数据库 添加MongoDB备选
```

**优势**:
- 只修改需要的部分
- 节省80%的token
- 保持文档一致性

---

### 6. `/doc-index` - 文档索引
生成或更新文档索引，快速了解项目文档结构。

**使用场景**:
- 新加入项目，想了解文档结构
- 文档更新后，重新生成索引
- 想快速查看所有文档摘要

**示例**:
```bash
/doc-index
/doc-index update
/doc-index category requirements
/doc-index summary
```

**优势**:
- 一次生成，多次使用
- 大幅节省后续查找的token
- 自动保持更新

---

## 🎯 使用建议

### 场景1: 查找信息
```
1. 先用 /doc-search 搜索关键词
2. 用 /doc-summary 查看摘要
3. 用 /doc-section 读取具体章节
```

### 场景2: 创建文档
```
1. 用 /doc-create 创建文档
2. 自动分段生成
3. 一次性完成
```

### 场景3: 修改文档
```
1. 用 /doc-search 找到文档
2. 用 /doc-section 读取要修改的章节
3. 用 /doc-update 更新内容
```

### 场景4: 了解项目
```
1. 用 /doc-index 生成索引
2. 查看 docs/SUMMARY.md
3. 根据需要读取具体文档
```

---

## 💡 Token节省对比

### 传统方式
```
读取完整文档: 5000 tokens
修改文档: 5000 tokens (重新生成)
总计: 10000 tokens
```

### 使用Skills
```
/doc-summary: 500 tokens
/doc-section: 800 tokens
/doc-update: 1000 tokens
总计: 2300 tokens
```

**节省**: 77% 的token！

---

## 🚀 快速开始

### 第一步：生成索引
```bash
/doc-index
```

这会生成：
- `docs/INDEX.json` - 完整索引
- `docs/SUMMARY.md` - 文档摘要

### 第二步：搜索文档
```bash
/doc-search 需求
```

### 第三步：查看摘要
```bash
/doc-summary requirements-planning
```

### 第四步：读取章节
```bash
/doc-section requirements-planning MVP
```

---

## 📖 最佳实践

### 1. 定期更新索引
```bash
# 每次添加或修改文档后
/doc-index update
```

### 2. 先摘要后详读
```bash
# 不要直接读取大文档
# 先查看摘要
/doc-summary 文档名

# 确定需要后再读取
/doc-section 文档名 章节名
```

### 3. 分段创建大文档
```bash
# 不要一次生成5000行
# 使用doc-create自动分段
/doc-create PRD 功能名
```

### 4. 精确更新
```bash
# 不要重写整个文档
# 只更新需要的章节
/doc-update 文档名 章节名 更新内容
```

---

## 🔧 配置

### 自动更新索引

在 `.git/hooks/pre-commit` 添加：

```bash
#!/bin/bash

# 检查是否有文档变更
if git diff --cached --name-only | grep -q "^docs/.*\.md$"; then
  echo "📚 更新文档索引..."
  # 这里会自动调用 /doc-index update
  # 需要配置自动化脚本
fi
```

---

## 📊 统计信息

当前项目文档：
- 总文档数: 15+
- 总大小: ~150KB
- 分类: 4个
- 标签: 12+

使用这些skills可以：
- 节省 70-90% 的token
- 提高 5-10倍 的查找效率
- 减少 80% 的重复工作

---

## 🆘 常见问题

### Q: 如何查看所有文档？
```bash
/doc-index summary
```

### Q: 如何搜索特定主题？
```bash
/doc-search 主题关键词
```

### Q: 如何只读取文档的一部分？
```bash
/doc-section 文档名 章节名
```

### Q: 如何创建大文档？
```bash
/doc-create 文档类型 主题
```

### Q: 如何更新文档？
```bash
/doc-update 文档名 章节名 更新描述
```

---

## 📝 反馈

如果你有任何建议或发现问题，请：
1. 在项目中创建Issue
2. 或直接修改skills定义
3. 或在TODO.md中记录

---

**记住**: 这些skills是为了提高效率，节省token。合理使用可以大幅提升开发体验！
