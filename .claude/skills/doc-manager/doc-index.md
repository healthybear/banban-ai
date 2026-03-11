---
name: doc-index
description: 生成或更新文档索引，快速了解项目文档结构
version: 1.0.0
---

# 文档索引 Skill

生成或更新文档索引，快速了解项目文档结构和内容概览。

## 使用方法

```
/doc-index [选项]
```

## 选项

- 无参数: 生成完整索引
- `update`: 更新现有索引
- `category [分类]`: 只索引特定分类
- `summary`: 生成简洁摘要

## 示例

```bash
# 生成完整索引
/doc-index

# 更新索引
/doc-index update

# 只索引需求文档
/doc-index category requirements

# 生成简洁摘要
/doc-index summary
```

## 实现流程

### 第一步：扫描文档
```
1. 遍历docs目录
2. 读取每个文档的front matter
3. 提取标题、标签、摘要
4. 统计文档大小和修改时间
```

### 第二步：生成索引
```
1. 按分类组织文档
2. 提取关键点（章节标题）
3. 生成摘要（前200字）
4. 创建标签索引
```

### 第三步：保存索引
```
1. 生成JSON格式索引 (docs/INDEX.json)
2. 生成Markdown摘要 (docs/SUMMARY.md)
3. 更新主README的文档链接
```

## 输出格式

### INDEX.json
```json
{
  "lastUpdated": "2026-03-11T22:00:00Z",
  "totalDocuments": 15,
  "totalSize": "150KB",
  "documents": [
    {
      "path": "docs/00-project-overview/vision.md",
      "title": "产品愿景",
      "summary": "产品定位为AI Agent平台...",
      "tags": ["愿景", "战略"],
      "size": "5KB",
      "lastModified": "2026-03-11",
      "keyPoints": [
        "AI Agent平台定位",
        "Multi-Agent + 个性化",
        "目标用户分析"
      ]
    }
  ],
  "categories": {
    "项目概览": [...],
    "需求文档": [...],
    "设计文档": [...]
  },
  "tags": {
    "愿景": [...],
    "需求": [...],
    "技术栈": [...]
  }
}
```

### SUMMARY.md
```markdown
# 文档快速摘要

> 最后更新: 2026-03-11
> 共 15 个文档，总大小 150KB

## 项目概览 (4个文档)

### 产品愿景
- **路径**: docs/00-project-overview/vision.md
- **大小**: 5KB
- **摘要**: 产品定位为AI Agent平台，核心差异化是Multi-Agent+个性化+开放插件
- **关键点**:
  - AI Agent平台定位
  - Multi-Agent + 个性化 + 开放插件
  - 目标用户：知识工作者、开发者

### 产品路线图
- **路径**: docs/00-project-overview/roadmap.md
- **大小**: 12KB
- **摘要**: MVP 3个月，v1.0 6个月，v2.0 12个月的详细规划
- **关键点**:
  - MVP: 基础对话+日程+LLM适配
  - v1.0: Multi-Agent+插件+个性化
  - v2.0: 移动端+语音+IDE

...
```

## 输出示例

```
📚 生成文档索引

第一步：扫描文档
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
扫描目录: docs/
找到文档: 15个
总大小: 150KB

分类统计:
- 项目概览: 4个文档
- 需求文档: 5个文档
- 设计文档: 0个文档
- 开发文档: 3个文档
- 模板: 3个文档

第二步：生成索引
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 提取文档元数据
✓ 生成摘要
✓ 提取关键点
✓ 创建标签索引
✓ 创建分类索引

第三步：保存索引
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 保存 docs/INDEX.json (8KB)
✓ 保存 docs/SUMMARY.md (12KB)
✓ 更新 README.md

✅ 索引生成完成！

快速查看:
- 完整索引: docs/INDEX.json
- 文档摘要: docs/SUMMARY.md
- 按分类: 15个文档分为4个分类
- 按标签: 12个标签

常用标签:
- 需求 (5个文档)
- 技术栈 (3个文档)
- 愿景 (2个文档)
- 规划 (4个文档)
```

## 索引用途

### 1. 快速查找
```bash
# 查找包含"LLM"的文档
cat docs/INDEX.json | jq '.documents[] | select(.title | contains("LLM"))'

# 查找需求相关文档
cat docs/INDEX.json | jq '.tags["需求"]'
```

### 2. 文档概览
```bash
# 查看所有文档摘要
cat docs/SUMMARY.md

# 查看特定分类
cat docs/SUMMARY.md | grep -A 10 "## 需求文档"
```

### 3. AI辅助
```
# 让AI基于索引回答问题
"根据INDEX.json，项目有哪些需求文档？"
"根据SUMMARY.md，MVP阶段要做什么？"
```

## 自动更新

### Git Hook
```bash
# .git/hooks/pre-commit
#!/bin/bash

# 检查是否有文档变更
if git diff --cached --name-only | grep -q "^docs/.*\.md$"; then
  echo "📚 更新文档索引..."
  /doc-index update
  git add docs/INDEX.json docs/SUMMARY.md
fi
```

### 定期更新
```bash
# 每天自动更新
crontab -e
0 0 * * * cd /path/to/project && /doc-index update
```

## 优势

- ✅ 快速了解项目文档结构
- ✅ 节省token（不需要读取所有文档）
- ✅ 支持快速搜索和过滤
- ✅ 自动保持更新
- ✅ 可以导出为其他格式

## 扩展功能

### 1. 生成文档地图
```bash
/doc-index map

# 生成可视化的文档关系图
```

### 2. 检查文档质量
```bash
/doc-index check

# 检查:
# - 缺少front matter的文档
# - 过大的文档 (>50KB)
# - 缺少摘要的文档
# - 孤立的文档（没有链接）
```

### 3. 生成文档统计
```bash
/doc-index stats

# 统计:
# - 文档数量趋势
# - 各分类占比
# - 最常用标签
# - 文档更新频率
```
