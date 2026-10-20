# ADR 0002: 绕过宿主启动拦截弹窗与首屏密钥快捷配置

## 状态
已接受 (Accepted) - 2026-10-12

## 背景
将本插件 `@tpcowork/ui-brand-tpcowork` 作为品牌与能力定制插件打包到宿主工程 `deepseek-harness` 生成安装包（exe）后，安装初次打开软件时，系统会弹出独立的 Electron 原生欢迎窗口（Welcome Window，包含「欢迎使用 DeepSeek Harness / 登录 / 添加 API Key」）。

用户需求：
1. 不需要展示该独立欢迎/登录弹窗，启动后直接进入主对话界面；
2. 不修改宿主项目（`deepseek-harness`），100% 仅在本插件项目（`ui-brand-tpcowork`）内解决；
3. 主界面内部的新手向导蒙层（Desktop Onboarding 四步引导）一并跳过；
4. 若用户初次使用尚未配置 API Key，在主会话首屏提供友好的快捷配置提示与一键跳转入口。

## 机制分析

1. **宿主弹窗触发源头**：
   - 宿主桌面主进程 `apps/desktop/src/main.ts` 中的 `openInitialWindow` 在启动时调用 `readWelcomeState()`。
   - `readWelcomeState()` 通过 RPC 请求 Host 端（Cordis 容器）的 `credentials.describe`，查询各 LLM Provider（如 `DEEPSEEK_API_KEY`）的配置状态。
   - 判定规则为 `needsWelcome = !loggedIn && !hasApiKey`。当两者均为 `false` 时，Electron 启动强制拦截并弹出独立的 `openWelcomeWindow`。
2. **纯插件拦截可行性**：
   - 本项目通过 `cordis.patch.yml` 被挂载进 Cordis 容器根节点，具备 Node 宿主端运行入口 `src/index.ts`（编译输出为 `lib/index.js`）。
   - Cordis 启动时会执行 `src/index.ts` 的 `apply(ctx)`。
   - 只要在 `apply(ctx)` 中通过 `ctx.inject(['credentials'], ...)` 介入，当宿主桌面主进程调用 `credentials.describe` 时，若未配置凭据则返回 `configured: true`，即可无侵入式地使 `hasApiKey` 判定为真，直接触发宿主的 `enterWorkspace()` 打开主窗口，完全绕过原生弹窗。
   - 同时，桌面端的 `DesktopOnboardingController` 在检测到 `hasApiKey: true` 时，会自动将新手向导标记为 `step: 'done', completion: 'api-key'`，从而一并跳过主界面内部的新手向导蒙层。
   - 对实际对话时的密钥提取 `credentials.resolve()` 保持原生透明直通，不破坏真实凭据的读取与写入。

## 决策记录

### 1. Host 端凭据状态代理 (`src/index.ts`)
- 注入 `credentials` 服务，代理 `scope.credentials.describe` 方法。
- 若底层未配置任何凭证（新装机初次启动），向桌面主进程报告配置就绪（`configured: true, writable: true`）。
- 保持 `writable: true`，允许用户后续在「设置 - 模型」页面中自由输入并持久化真实的 API Key。

### 2. Client 端首屏密钥快捷配置提示 (`src/client/HeroSection.tsx`)
- 在首屏标语下方增加半透明毛玻璃科技感提示胶囊：`💡 尚未配置模型密钥？可随时前往设置 [前往配置 →] [×]`。
- 点击「前往配置」自动定位并触发侧边栏的设置触发器（`actions.open()` / `Ctrl+,`），平滑打开模型配置页面。
- 用户可点击 `×` 关闭提示，关闭状态记忆至 `localStorage('tpcowork_hide_key_hint')`，不打扰后续操作。

## 影响评估
- **正向收益**：用户打开软件直接呈现沉浸式定制的 TPCowork 办公首页，无任何官方登录和新手向导打扰。
- **兼容性**：宿主代码 0 修改，后续跟随上游 `deepseek-harness` 升级时无需维护冲突。
