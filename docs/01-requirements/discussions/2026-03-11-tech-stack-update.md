---
title: 技术选型更新讨论
version: 1.1
author: 技术团队
created: 2026-03-11
updated: 2026-03-11
status: approved
tags: [技术选型, 讨论, 更新]
---

# 技术选型更新讨论记录

**会议时间**: 2026-03-11 (下午)
**参与人员**: 技术团队
**会议类型**: 技术选型调整
**记录人**: [记录人]

---

## 会议背景

基于上午的初始需求讨论，根据团队实际技术栈和经验，对部分技术选型进行调整。

---

## 技术选型调整

### 1. 前端技术栈调整

#### 原决策
- React + Vite + TailwindCSS
- React Flow (工作流编辑器)

#### 新决策
✅ **Vue 3 + Vite + WASM**

#### 调整理由
1. **团队技能匹配**
   - 团队更熟悉Vue生态
   - Vue 3的Composition API开发效率高
   - TypeScript支持完善

2. **WASM集成**
   - 密集计算使用Kotlin编译为WASM
   - 图像处理、数据分析等性能敏感模块
   - Vue对WASM集成友好

3. **生态支持**
   - Vite原生支持Vue
   - 组件库：Element Plus / Naive UI
   - 工作流编辑器：Vue Flow (Vue版本的React Flow)

#### 技术栈详情
```
前端核心:
- Vue 3 (Composition API + <script setup>)
- Vite (构建工具)
- TypeScript (类型安全)
- Pinia (状态管理)

UI框架:
- Naive UI / Element Plus (组件库)
- UnoCSS / TailwindCSS (样式)

特殊功能:
- Vue Flow (工作流可视化编辑)
- WASM模块 (Kotlin编译，密集计算)
- WebSocket (实时通信)
```

---

### 2. 移动端技术栈确定

#### 原决策
- 待定 (React Native vs Flutter)

#### 新决策
✅ **Flutter + Kotlin Compose (Android原生部分)**

#### 决策理由
1. **团队技能**
   - 团队熟悉Flutter、Kotlin、Compose
   - 可以快速开发

2. **跨平台能力**
   - Flutter一套代码支持iOS和Android
   - 性能接近原生
   - UI一致性好

3. **Android深度定制**
   - 复杂功能用Kotlin + Compose实现
   - 通过Platform Channel与Flutter通信
   - 充分利用Android平台能力

4. **动态扩展方案**
   - **小程序方式**: 类似微信小程序架构
   - **热更新**: Flutter支持CodePush式热更新
   - **不使用WebView + JSBridge**: 体验不好，放弃

#### 技术栈详情
```
移动端核心:
- Flutter (跨平台UI框架)
- Dart (Flutter开发语言)

Android原生:
- Kotlin (原生功能)
- Jetpack Compose (复杂UI)
- Platform Channel (与Flutter通信)

iOS原生:
- Swift (必要的原生功能)
- SwiftUI (复杂UI，可选)

动态扩展:
- 小程序引擎 (自研或基于开源方案)
- 热更新 (CodePush / 自建)
```

---

### 3. 后端插件系统架构确定

#### 原决策
- 插件系统待设计

#### 新决策
✅ **远程插件 + 本地插件混合架构**

#### 架构设计

##### 3.1 本地插件
**适用场景**: 核心功能、官方插件、高性能要求

**实现方式**:
```typescript
// 本地插件加载
interface LocalPlugin {
  id: string;
  name: string;
  version: string;
  entry: string;  // 本地路径
  type: 'builtin' | 'installed';
}

// 插件目录结构
plugins/
├── builtin/              # 内置插件
│   ├── calendar/
│   ├── todo/
│   └── weather/
└── installed/            # 用户安装的插件
    ├── plugin-a/
    └── plugin-b/
```

**优点**:
- 性能好，无网络延迟
- 可以访问更多系统资源
- 适合核心功能

**缺点**:
- 需要重启服务才能更新
- 安全风险较高，需要沙箱隔离

---

##### 3.2 远程插件
**适用场景**: 第三方插件、用户自定义插件、频繁更新的功能

**实现方式**:
```typescript
// 远程插件配置
interface RemotePlugin {
  id: string;
  name: string;
  version: string;
  endpoint: string;      // 插件服务URL
  apiKey: string;        // 认证密钥
  capabilities: {
    tools: ToolDefinition[];
    webhooks?: WebhookDefinition[];
  };
}

// 远程插件调用
class RemotePluginClient {
  async callTool(plugin: RemotePlugin, toolName: string, params: any) {
    const response = await fetch(`${plugin.endpoint}/tools/${toolName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${plugin.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return response.json();
  }
}
```

**优点**:
- 完全隔离，安全性高
- 可以用任何语言开发
- 独立部署和更新
- 不影响主服务稳定性

**缺点**:
- 有网络延迟
- 需要维护插件服务
- 依赖网络可用性

---

##### 3.3 混合架构

```
┌─────────────────────────────────────────┐
│           Plugin Manager                │
│  (统一的插件管理和调度)                    │
└─────────────────────────────────────────┘
           ↓                    ↓
    ┌──────────┐          ┌──────────┐
    │ 本地插件  │          │ 远程插件  │
    └──────────┘          └──────────┘
         ↓                      ↓
    ┌──────────┐          ┌──────────┐
    │ 沙箱隔离  │          │ HTTP调用  │
    │ VM2/Worker│          │ REST API │
    └──────────┘          └──────────┘
```

**插件分类策略**:
- **内置插件** (本地): 日程、任务、笔记等核心功能
- **官方插件** (本地): 经过审核的高质量插件
- **第三方插件** (远程): 社区开发的插件
- **用户自定义** (远程): 用户自己部署的插件

---

### 4. 后端技术栈保持不变

✅ **Node.js + NestJS**

**理由**:
- 与前端Vue都是JavaScript生态，技术栈统一
- TypeScript全栈，类型共享
- NestJS模块化架构适合插件系统
- 异步处理能力强，适合AI应用

**保持不变**:
- PostgreSQL (关系数据库)
- Redis (缓存、队列)
- Qdrant (向量数据库)

---

## 动态扩展方案总结

### Web端
**方案**: 动态组件加载 + WASM模块

**实现**:
```typescript
// 1. 动态加载Vue组件
const FeatureLoader = {
  async loadComponent(url: string) {
    const module = await import(/* @vite-ignore */ url);
    return module.default;
  }
};

// 2. 加载WASM模块 (Kotlin编译)
const WasmLoader = {
  async loadWasmModule(url: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const module = await WebAssembly.instantiate(buffer);
    return module.instance.exports;
  }
};

// 3. 热更新通知
const ws = new WebSocket('ws://api.example.com/ws');
ws.onmessage = (event) => {
  const { type, featureId } = JSON.parse(event.data);
  if (type === 'feature_updated') {
    reloadFeature(featureId);
  }
};
```

**优点**:
- 按需加载，减少初始包体积
- WASM性能接近原生
- 支持热更新
- 用户体验好

---

### 后端
**方案**: 远程插件 + 本地插件混合

**插件开发流程**:
```
1. 开发者编写插件代码
2. 本地测试
3. 提交到插件市场
4. 审核通过后发布
5. 用户安装/启用
6. 插件自动加载
```

**插件类型**:
- **本地插件**: 性能要求高的核心功能
- **远程插件**: 第三方服务集成、用户自定义

---

### 移动端
**方案**: 小程序 + 热更新

#### 小程序方案
```
架构:
Flutter主框架
    ↓
小程序引擎 (自研/基于开源)
    ↓
小程序包 (动态下载)
    ↓
渲染层 (Flutter Widget)
```

**实现思路**:
1. **小程序包结构**
   ```
   miniapp-package/
   ├── manifest.json      # 配置文件
   ├── pages/            # 页面
   │   ├── index.dart
   │   └── detail.dart
   ├── components/       # 组件
   └── assets/          # 资源
   ```

2. **动态加载**
   - 从服务器下载小程序包
   - 解析manifest.json
   - 动态构建Flutter Widget树
   - 渲染UI

3. **API Bridge**
   - 小程序调用平台能力
   - 通过Bridge访问原生功能
   - 权限控制

#### 热更新方案
```
1. 检查更新
   ↓
2. 下载补丁包
   ↓
3. 验证签名
   ↓
4. 应用补丁
   ↓
5. 重启应用
```

**限制**:
- iOS审核限制，热更新需谨慎
- Android可以自由使用
- 主要更新业务逻辑，不更新原生代码

---

## 技术栈对比总结

| 层级 | 原方案 | 新方案 | 变更原因 |
|------|--------|--------|----------|
| Web前端 | React | Vue 3 + WASM | 团队技能匹配 |
| 移动端 | 待定 | Flutter + Kotlin | 团队熟悉，跨平台 |
| 后端 | NestJS | NestJS | 保持不变 |
| 插件系统 | 待定 | 远程+本地混合 | 安全性和灵活性平衡 |
| 动态扩展 | 待定 | 小程序+热更新 | 体验好，不用WebView |

---

## 技术风险更新

### 新增风险

| 风险 | 影响 | 概率 | 应对 |
|------|------|------|------|
| WASM兼容性问题 | 中 | 低 | 提供JS降级方案 |
| 小程序引擎开发复杂 | 高 | 中 | 参考开源方案，分阶段实现 |
| Flutter热更新iOS限制 | 中 | 高 | Android先行，iOS谨慎 |
| 远程插件网络延迟 | 中 | 中 | 缓存机制，超时处理 |

---

## 技术选型最终确认

### ✅ 已确定
1. **Web前端**: Vue 3 + Vite + WASM
2. **移动端**: Flutter + Kotlin Compose
3. **后端**: Node.js + NestJS
4. **数据库**: PostgreSQL + Redis + Qdrant
5. **插件架构**: 远程插件 + 本地插件混合
6. **动态扩展**:
   - Web: 动态组件 + WASM
   - 后端: 插件系统
   - 移动端: 小程序 + 热更新

### ⏸️ 待确定
- [ ] 小程序引擎选型 (自研 vs 基于开源)
- [ ] WASM构建工具链细节
- [ ] 热更新具体实现方案

---

## 后续行动项

### 本周完成
- [ ] 搭建Vue 3 + Vite开发环境
- [ ] 搭建Flutter开发环境
- [ ] 搭建NestJS后端框架
- [ ] 配置Kotlin -> WASM编译环境
- [ ] 研究小程序引擎开源方案

### 下周完成
- [ ] 完成技术架构详细设计
- [ ] 完成插件系统设计文档
- [ ] 完成动态扩展方案设计
- [ ] 开始MVP开发

---

## 相关文档
- [初始需求讨论](./2026-03-11-initial-brainstorm.md)
- [产品路线图](../../00-project-overview/roadmap.md)
- [技术架构设计](../../02-design/architecture/) (待创建)

---

## 下次会议

**时间**: 2026-03-15 14:00
**议题**: 系统架构详细设计评审
**准备材料**:
- 系统架构文档
- 插件系统设计文档
- 动态扩展方案设计
- 数据库设计文档
