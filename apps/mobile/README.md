# mobile

Flutter 移动端应用。

## 说明

- 独立 Flutter 项目，不纳入 pnpm workspaces
- 通过 UniMP SDK（uni小程序SDK）内嵌运行 uni-app 小程序
- Flutter ↔ 小程序通信：MethodChannel(`banban/unimp`) + EventChannel
- 协议格式：MCP 风格 JSON `{ type, name, params, id }`

## 待创建

```bash
flutter create . --org com.banban --platforms android,ios
```
