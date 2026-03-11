---
name: doc-summary
description: 快速获取文档摘要，不读取完整内容
version: 1.0.0
---

# 文档摘要 Skill

快速获取文档的核心内容摘要，节省token。

## 使用方法

```
/doc-summary [文档路径或关键词]
```

## 示例

```bash
# 获取产品愿景摘要
/doc-summary vision

# 获取需求规划摘要
/doc-summary requirements-planning

# 获取特定文档摘要
/doc-summary docs/00-project-overview/roadmap.md
```

## 实现

当用户调用此skill时，执行以下步骤：

1. 定位文档（通过路径或关键词搜索）
2. 只读取文档的前100行或front matter
3. 提取关键信息：
   - 标题
   - 标签
   - 主要章节标题
   - 前200字内容
4. 生成简洁摘要

## 输出格式

```
📄 产品愿景

**路径**: docs/00-project-overview/vision.md
**大小**: 5KB
**标签**: 愿景, 战略, 产品
**最后更新**: 2026-03-11

**核心内容**:
- 产品定位: AI Agent平台
- 核心差异化: Multi-Agent + 个性化 + 开放插件
- 目标用户: 知识工作者、开发者、创业者
- 成功指标: MVP 100用户，v1.0 10K用户

**主要章节**:
1. 愿景声明
2. 核心理念
3. 我们要解决的问题
4. 目标用户
5. 产品定位
6. 核心价值主张
7. 成功指标

需要查看详细内容吗？
```

## 优势

- ✅ 节省token（不读取完整文档）
- ✅ 快速了解文档概况
- ✅ 支持批量查看多个文档摘要
