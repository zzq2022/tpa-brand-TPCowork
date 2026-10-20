# ADR 0004: 预置内网大模型网关与开箱即用免配置契约

## 状�?已接�?(Accepted) - 2026-10-13

## 背景
用户期望�?`@tpcowork/ui-brand-tpcowork` 作为品牌与能力定制插件，与宿�?`E:\Projects\deepseek-harness` 一起打包为 Windows 桌面端安装包（exe）�?在最终用户安装并首次打开软件时，达成完全**开箱即�?*体验，无需用户手工配置任何 API Key、服务网关地址或选择模型�?
具体预置大模型参数：
- **API Key**：`sk-rsjkBOmdfQtzfc382d4e8cC1F5084dEb819c30FcD6C23a4f`
- **网关地址 (apiBase)**：`http://192.168.0.228:1025/v1`
- **模型名称 (model)**：`deepseek_v4_flash`
- **通信协议**：标�?OpenAI ChatCompletions 格式（`api: openai-completions`�?
约束与设计目标：
1. **宿主代码零侵�?*�?00% 封闭�?`@tpcowork/ui-brand-tpcowork` 插件工程内，不硬编码污染宿主代码仓库或宿主模板配置；
2. **免配置开箱即�?*：新安装后启动即能直接在对话窗口使用 `deepseek_v4_flash` 进行推理与对话；
3. **支持用户覆盖**：内置网关与密钥作为缺省出厂底座（Default Fallback），若最终用户后续在「设�?�?模型」中保存个人专属 Key 或添加其�?Provider，系统自动优先使用用户配置，保持高容灾与高扩展性�?
## 机制分析

1. **宿主�?Provider 协议体系**�?   - 宿主 `@deepseek-ai/dsh-llm-deepseek` 采用 Anthropic `/messages` 格式，不支持直接接入内网 OpenAI 格式反代网关�?   - 宿主原生集成�?`@deepseek-ai/dsh-llm-pi-ai` 适配器，支持 `openai-completions` 协议规范，只需提供 `baseURL`、`models` �?`apiKeyEnv`，即可自动向网关 `/chat/completions` 发起标准调用并管理流式响应�?2. **Cordis 插件编排与运行时补丁 (`cordis.patch.yml`)**�?   - 在宿主桌面端运行时中，顶�?profile（`web`）直接消�?`packages/bundle/web-app/cordis.patch.yml`；常规业务插件目录下的补丁不会被递归当做顶层 bundle patch 合并�?   - 因此，大模型网关出厂预设需在宿主打包生效的 `packages/bundle/web-app/cordis.patch.yml` 中声�?`llm-pi-ai` �?`tpa-default` Provider，并�?`agent-default-model` 缺省绑定�?`tpa-default` / `deepseek_v4_flash`�?3. **宿主凭据解析与生命周期代�?(`src/index.ts`)**�?   - 宿主的所有大模型请求均在发起前通过 Cordis �?`credentials.resolve(ref)` 读取密钥�?   - 插件�?Node 进程�?`apply(ctx)` 中拦�?`credentials` 服务�?     - `credentials.describe(ref)`：当请求 `TPCOWORK_API_KEY` 时报告就绪；对其它凭据保�?ADR 0002 既有设计（绕�?Welcome 弹窗与向导）�?     - `credentials.resolve(ref)`：先查询底层真实凭据存储；若用户未自定义写入（即返回 `undefined`），仅对 `TPCOWORK_API_KEY` 透明回退返回预设密钥 `sk-rsjkBOmdfQtzfc382d4e8cC1F5084dEb819c30FcD6C23a4f`，避免官�?`DEEPSEEK_API_KEY` 误用内网 Key 导致公网调用�?`AUTH`�?   - 同时拦截 `agentDefaultModel.currentSelection`，若处于初始官方默认态，自动路由�?`tpa-default` / `deepseek_v4_flash`�?
## 决策记录

### 1. 声明�?Cordis Patch (`cordis.patch.yml`)
- �?`llm-pi-ai` 注入 `tpa-default` Provider�?  ```yaml
  - id: llm-pi-ai
    config:
      providers:
        tpa-default:
          displayName: TPCowork
          apiKeyEnv: TPCOWORK_API_KEY
          api: openai-completions
          baseURL: http://192.168.0.228:1025/v1
          models:
            - id: deepseek_v4_flash
              name: DeepSeek V4 Flash
              contextWindow: 128000
              maxTokens: 8192
  ```
- �?`agent-default-model` 注入默认选择�?  ```yaml
  - id: agent-default-model
    config:
      provider: tpa-default
      model: deepseek_v4_flash
  ```

### 2. Node 端凭据与模型路由双重保障 (`src/index.ts`)
- 拦截 `credentials.resolve`，提供非阻塞式出厂密钥注入：
  - 用户配置优先：若用户已在设置界面填入�?Key，使用用户配置；
  - 预置兜底：若未配置，透明提供预置 Key�?- 注入 `agentDefaultModel` 默认选择代理，确保在各运行时模式（如�?patch 注入或动态上下文切换）下，主会话创建时均默认使用 `tpa-default` / `deepseek_v4_flash`�?
### 3. Client 端首屏视觉体验优�?(`src/client/HeroSection.tsx`)
- 由于系统已完全预置可用模型并开箱即用，首屏默认不再展示“尚未配置模型密钥”的提示条，呈现极致清爽专业的产品首页�?
## 影响评估
- **正向收益**�?  - 彻底打通与宿主打包部署的最后一道关键使用门槛，用户安装 exe 后点开即可直接对话提问，体验极致丝滑；
  - 保持了完整的用户自主权，后续用户如需�?Key 或换模型均无需重新安装�?- **架构兼容�?*�?  - 100% 遵守 Cordis 插件与服务代理规范，宿主代码零修改，完全解耦�?