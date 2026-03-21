# 小程序架构设计

> 更新时间：2026-03-21

## 概述

项目采用 **uni-app（Vue 3）** 作为小程序开发框架，一套代码编译到多个平台。Flutter 宿主 App 通过 **UniMP SDK** 嵌入并运行小程序运行时，Agent 与小程序之间通过统一协议进行通信。

---

## 目录结构

```
banban-ai/
├── packages/
│   └── miniapp-shared/       # 小程序共享代码（多个小程序复用）
│       └── src/
│           ├── composables/
│           │   ├── useRequest.ts   # 通用请求状态管理
│           │   └── useUser.ts      # 用户登录态管理
│           └── utils/
│               ├── request.ts      # uni.request 封装（自动带 JWT）
│               └── format.ts       # 日期、餐次等格式化工具
├── apps/
│   ├── food-miniapp/         # 美食小程序（MVP，uni-app Vue 3）
│   └── mobile/               # Flutter 宿主 App
```

---

## 小程序框架：uni-app（Vue 3）

### 选型理由

- 与项目已选 Vue 3 技术栈统一，知识栈无割裂
- 一套代码编译到：**微信小程序 / 支付宝小程序 / 抖音小程序 / H5**
- 社区插件丰富，食物识别、扫码、地图等 MVP 功能均有现成组件
- `@banban/miniapp-shared` 包可在多个小程序之间共享 composables 和工具函数

### 编译目标

| 平台 | 用途 |
|------|------|
| 微信小程序 | 主要用户入口 |
| 支付宝小程序 | 支付宝生态用户 |
| 抖音小程序 | 抖音生态用户 |
| H5 | 浏览器访问 / 开发调试 |

### 新增小程序流程

以 `apps/simple-miniapp` 为模板，复制改造：

```bash
cp -r apps/food-miniapp apps/new-miniapp
# 修改 package.json name，修改 pages.json 页面路由
```

---

## Flutter 嵌入小程序：UniMP SDK

### 方案说明

DCloud 提供 **UniMP SDK**（Android/iOS 原生），可在 Flutter 宿主 App 内运行完整的 uni-app 小程序运行时，**不是 WebView H5**，行为与真实小程序一致。

官方只支持 Android/iOS 原生集成，Flutter 通过 **自建 MethodChannel 桥** 调用原生层。

### 通信链路

```
Flutter (Dart)
  └─ MethodChannel("banban/unimp")
       └─ 原生层 Android / iOS（UniMP SDK）
            └─ uni-app 小程序运行时（JS Engine）
```

### 打开小程序

```dart
// Flutter 侧调用原生 UniMP SDK 打开指定小程序
const channel = MethodChannel('banban/unimp');
await channel.invokeMethod('openMiniApp', {
  'appId': 'food-miniapp',
  'path': '/pages/index/index',
});
```

---

## Agent ↔ 小程序通信

### 统一协议格式（MCP 风格 JSON）

```json
{
  "type": "tool_call",
  "name": "log_meal",
  "params": { "description": "红烧肉", "mealType": "lunch" },
  "id": "uuid"
}
```

### 传输层（按运行环境）

| 运行环境 | 传输层 | 实现方式 |
|----------|--------|----------|
| Flutter 内嵌（UniMP SDK） | MethodChannel + EventChannel | Agent → Dart → MethodChannel → UniMP SDK API → 小程序 JS；小程序 JS → UniMP 回调 → EventChannel → Dart → Agent |
| 原生小程序（微信 / 支付宝 / 抖音） | WebSocket via NestJS WS Gateway | 小程序 `uni.connectSocket()` 连接后端，Agent 通过 REST API 下发指令到 WS |

### 协议统一的意义

无论小程序运行在哪个平台，**上层 Agent 的调用代码完全一致**，只有底层传输层实现不同。后续新增小程序时，只需在 `miniapp-shared` 中实现对应的通信适配器即可。

---

## 当前状态（2026-03-21）

| 模块 | 状态 | 说明 |
|------|------|------|
| `apps/food-miniapp/` | 骨架已创建 | uni-app Vue 3，待实现页面逻辑 |
| `packages/miniapp-shared/` | 骨架已创建 | composables + utils 待实现 |
| `apps/mobile/` | 目录已创建 | Flutter 项目待 `flutter create` 初始化 |
| UniMP SDK 集成 | 未开始 | MVP 阶段先用 Web 调试，UniMP SDK 在 Flutter App 阶段接入 |
| WS Gateway（NestJS） | 未开始 | 待 chat 模块成熟后接入 Socket.io |
