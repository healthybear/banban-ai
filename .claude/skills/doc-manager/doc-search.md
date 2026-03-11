---
name: doc-search
description: 搜索项目文档，快速定位相关内容
version: 1.0.0
---

# 文档搜索 Skill

快速搜索项目文档，支持关键词、标签、类别搜索。

## 使用方法

```
/doc-search [关键词]
```

## 示例

```bash
# 搜索LLM相关文档
/doc-search LLM

# 搜索需求文档
/doc-search 需求

# 搜索技术栈
/doc-search 技术栈
```

## 实现

当用户调用此skill时，执行以下步骤：

1. 使用Grep工具搜索关键词
2. 返回匹配的文档列表
3. 显示每个文档的路径和摘要
4. 询问用户是否需要查看详细内容

## 搜索范围

- `docs/00-project-overview/` - 项目概览
- `docs/01-requirements/` - 需求文档
- `docs/02-design/` - 设计文档
- `docs/03-development/` - 开发文档
- `TODO.md` - 任务清单
- `PROGRESS.md` - 进度记录

## 输出格式

```
找到 X 个相关文档：

1. 📄 产品愿景 (docs/00-project-overview/vision.md)
   摘要: 产品定位为AI Agent平台...

2. 📄 需求规划 (docs/01-requirements/requirements/requirements-planning.md)
   摘要: 完整的需求清单，MVP包括...

需要查看哪个文档的详细内容？
```
