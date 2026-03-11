---
name: doc-manager
description: Efficiently manage project documentation with token-saving operations. Use when users want to search docs, get doc summaries without reading full content, read specific sections only, create large documents in chunks, update doc sections, or generate doc indexes. Especially useful for large documentation sets (50+ docs) to avoid token waste. Trigger when users mention "find doc", "doc summary", "what's in", "create PRD", "update doc", "doc index", or when working with docs/ directory.
---

# Documentation Manager

A comprehensive skill for managing large documentation sets efficiently, saving 70-90% of tokens compared to traditional file operations.

## When to Use This Skill

Use this skill whenever working with project documentation, especially when:
- Searching for information across multiple docs
- Need quick overview without reading full content
- Working with large documents (>20KB)
- Creating structured documents (PRD, design docs, API docs)
- Updating specific sections of documents
- Need to understand documentation structure

## Core Operations

### 1. Search Documents (`search`)

Quickly find relevant documents by keyword, tag, or category.

**Usage**: "search for LLM docs" or "find requirements documents"

**How it works**:
1. Use Grep to search across all docs
2. Return matching files with context
3. Show brief summary of each match
4. Ask if user wants to see details

**Example**:
```
User: "Find all documents about the MVP"
Assistant:
Found 3 documents:
1. requirements-planning.md - MVP范围: 对话+日程+LLM适配
2. roadmap.md - MVP时间规划: 6个月
3. initial-brainstorm.md - MVP讨论记录

Which would you like to see?
```

---

### 2. Get Document Summary (`summary`)

Get core content without reading the full document. Saves ~90% tokens.

**Usage**: "summarize vision doc" or "what's in the roadmap"

**How it works**:
1. Read only first 100 lines or front matter
2. Extract: title, tags, key sections, first 200 chars
3. Present concise summary
4. Offer to read specific sections if needed

**Example**:
```
User: "What's in the product vision?"
Assistant:
📄 Product Vision (5KB)

Core Content:
- Product positioning: AI Agent platform
- Differentiation: Multi-Agent + personalization + open plugins
- Target users: knowledge workers, developers, entrepreneurs
- Success metrics: MVP 100 users, v1.0 10K users

Main Sections:
1. Vision Statement
2. Core Philosophy
3. Problems We Solve
4. Target Users
5. Product Positioning

Need details on any section?
```

---

### 3. Read Document Section (`section`)

Read only the specific section needed. Saves ~80% tokens.

**Usage**: "read the MVP section from roadmap" or "show me target users from vision"

**How it works**:
1. Locate the document
2. Use Grep to find the section heading
3. Extract content until next same-level heading
4. Return only that section

**Example**:
```
User: "Show me the target users section"
Assistant: [reads only that section, not the entire 5KB file]

## Target Users

### Primary User Groups
1. **Knowledge Workers** - professionals managing complex schedules
2. **Developers** - need coding assistants and workflow automation
...
```

---

### 4. Create Large Document (`create`)

Create structured documents in chunks, avoiding output limits.

**Usage**: "create a PRD for LLM adapter" or "generate API documentation"

**How it works**:
1. Generate detailed outline based on document type
2. Show outline for user confirmation
3. Generate content section by section (~500 lines each)
4. Save each section as generated
5. Merge and finalize

**Supported document types**:
- **PRD** (Product Requirements): Uses template from docs/12-templates/PRD-template.md
- **Design Doc**: Architecture, modules, interfaces, database, etc.
- **API Doc**: Overview, auth, endpoints, errors, examples

**Example**:
```
User: "Create a PRD for the LLM adapter"
Assistant:
Step 1: Generating outline...
1. Overview
2. User Analysis
3. Functional Requirements
   3.1 Multi-model support
   3.2 Quota management
   3.3 Smart switching
4. Non-functional Requirements
...

Looks good? (y/n)

Step 2: Generating content...
[1/5] Overview section ✓
[2/5] User Analysis ✓
...

✅ Document created: docs/01-requirements/requirements/PRD-llm-adapter.md
```

---

### 5. Update Document Section (`update`)

Update specific sections without rewriting entire document. Saves ~80% tokens.

**Usage**: "update the MVP section in roadmap" or "add enterprise users to vision"

**How it works**:
1. Locate document and section
2. Read current section content
3. Generate updated content based on user request
4. Show before/after comparison
5. Apply update using Edit tool
6. Update document metadata

**Example**:
```
User: "Add enterprise users to the target users section"
Assistant:
Found section: Target Users in vision.md

Current content: 1200 words, 4 user groups

Generating update...

New content preview:
**Wang - Startup CEO**
- 35 years old, startup founder
- Needs team/project/customer management
...

Confirm update? (y/n)

✅ Updated! Added 150 words to Target Users section.
```

---

### 6. Generate Document Index (`index`)

Create searchable index of all documentation. One-time cost, saves tokens forever.

**Usage**: "generate doc index" or "update documentation index"

**How it works**:
1. Scan docs/ directory recursively
2. Extract metadata from each file (front matter)
3. Generate summaries (first 200 chars)
4. Extract key points (section headings)
5. Create category and tag indexes
6. Save as docs/INDEX.json and docs/SUMMARY.md

**Output files**:
- `docs/INDEX.json`: Machine-readable index with full metadata
- `docs/SUMMARY.md`: Human-readable summary with key points

**Example**:
```
User: "Generate documentation index"
Assistant:
Scanning docs/...
Found 15 documents (150KB total)

Categories:
- Project Overview: 4 docs
- Requirements: 5 docs
- Development: 3 docs
- Templates: 3 docs

✅ Index generated!
- docs/INDEX.json (8KB)
- docs/SUMMARY.md (12KB)

You can now search and summarize docs much faster!
```

---

## Token Savings

| Operation | Traditional | With Skill | Savings |
|-----------|-------------|------------|---------|
| View summary | 5000 tokens | 500 tokens | 90% |
| Read section | 5000 tokens | 800 tokens | 84% |
| Create large doc | May fail | Auto-chunked | 100% |
| Update section | 5000 tokens | 1000 tokens | 80% |
| Search docs | Multiple reads | One search | 70% |

**Average savings: ~80% of tokens**

---

## Best Practices

### For Users

1. **Start with search or summary** - Don't read full docs immediately
2. **Use sections for large docs** - Only read what you need
3. **Generate index once** - Then use it for all future searches
4. **Update sections, not whole docs** - Much more efficient

### For Implementation

1. **Always check if INDEX.json exists** - Use it if available
2. **Read front matter first** - Get metadata without full content
3. **Use Grep with context** - Show surrounding lines for better understanding
4. **Preserve formatting** - Match original document style when updating
5. **Update metadata** - Change `updated` field when modifying docs

---

## File Organization

This skill expects documentation in:
```
docs/
├── INDEX.json (generated by index operation)
├── SUMMARY.md (generated by index operation)
├── 00-project-overview/
├── 01-requirements/
├── 02-design/
├── 03-development/
└── 12-templates/
```

---

## Examples

### Example 1: Finding Information
```
User: "What's our tech stack?"
Assistant: [uses search]
Found in 2 documents:
1. tech-stack-update.md - Vue 3 + Express + Flutter
2. solo-dev-adjustment.md - Detailed breakdown

[uses summary on first doc]
Tech Stack:
- Frontend: Vue 3 + Vite + Naive UI
- Backend: Express + TypeScript + Prisma
- Mobile: Flutter + Kotlin Compose
- Database: PostgreSQL + Redis + Qdrant
```

### Example 2: Creating Documentation
```
User: "Create a PRD for the chat feature"
Assistant: [uses create operation]
Generating outline based on PRD template...
[Shows outline]
[Generates content in chunks]
✅ Created: docs/01-requirements/requirements/PRD-chat-feature.md
```

### Example 3: Updating Documentation
```
User: "The MVP timeline changed to 6 months, update the roadmap"
Assistant: [uses update operation]
Found: roadmap.md > MVP section
Current: "3个月"
Updating to: "6个月"
✅ Updated roadmap.md
```

---

## Integration with Other Tools

This skill works seamlessly with:
- **Grep**: For searching content
- **Read**: For reading specific files
- **Edit**: For updating sections
- **Write**: For creating new documents
- **Glob**: For finding files by pattern

---

## Troubleshooting

**Q: Index not found**
A: Run the `index` operation first to generate INDEX.json

**Q: Section not found**
A: Try fuzzy matching or list all sections first

**Q: Document too large to create**
A: The `create` operation automatically chunks it

**Q: Update failed**
A: Check if section heading exists exactly as specified

---

## Future Enhancements

Potential additions (not yet implemented):
- Semantic search using embeddings
- Auto-detect outdated documentation
- Generate documentation from code
- Cross-reference validation
- Documentation quality metrics

---

Remember: This skill is designed to save tokens and time. Always prefer using it over reading full documents directly!
