# @tpcowork/ui-brand-tpcowork

**TPCowork** 专属桌面客户端品牌与沉浸式体验定制插件（基于 DeepSeek Harness 官方插件与插槽体系）。

---

## 📖 项目定位

本项目为 **TPCowork** 定制客户端套件，通过官方无侵入式的 **Cordis 插件机制** 与 **UI Slot 插槽体系**，全方位接管客户端的界面视觉、交互引导以及 Windows 操作系统原生桌面标识，将通用开源底座无缝转变为专业、高质感、点击即用的 TPCowork 协作客户端。

---

## ✨ 核心功能全景

### 1. 侧边栏品牌全景接管 (Sidebar & Navigation Rail)
- **品牌矢量徽标 (`sidebar.brand.mark`)**：
  - 采用精心调校的科技蓝多层渐变圆角盾标，内置极简白「TP」字符与右上角高光脉冲星点，在侧边栏展开态与紧凑折叠态（Navigation Rail）下均具备高识别度与抗锯齿呈现。
- **品牌渐变字标 (`sidebar.brand.name`)**：
  - 由纯净白「TP」与科技蓝渐变「Cowork」精细排版组成，匹配现代设计系统字阶，完全替代官方默认文本。
- **高优先级遮蔽**：
  - 插槽注册优先级设定为 `-100`，自动静默禁用并彻底替代官方默认品牌组件（`ui-brand-official`）。

---

### 2. 对标 WorkBuddy 的会话首屏体验 (WorkBuddy-Style Hero Section)
针对新建会话空白页（`conversation.hero.brand.mark`）进行了重磅微调与体验升级：
- **亲和力专属主标语**：
  - 居中呈现超大醒目标题 **`TPCowork, 我帮你`**，融合品牌渐变文字，取代原版简单的产品名。
- **3 大高频场景分类导航 Tabs**：
  - `☕ 日常办公`：涵盖财报分析、周报总结、MD转PDF、竞品对比分析；
  - `🌐 代码开发`：涵盖 Code Review 与优化、前端组件单测编写、自动化爬虫脚本、RESTful API 规范设计；
  - `🎨 设计创意`：涵盖品牌整合营销文案、产品 PRD 撰写、竞品视觉风格分析、爆款小红书脚本。
- **结构化 Prompt 快捷胶囊与自动填入**：
  - 动态切换的 12 组高质量提示词胶囊（Chips）；
  - **点击即用交互**：点击任意胶囊后，通过智能注入器自动将结构化专业 Prompt 填入下方的 Lexical 富文本输入框，并自动平滑聚焦光标，大幅降低用户冷启动与写 Prompt 的门槛。
- **纯净界面降噪**：
  - 全局泛选择器规则彻底隐藏官方原版的「探索未至之境」与「预览版」徽标标签，将视觉焦点完全还给核心业务与快捷引导。

---

### 3. TPCowork 伴侣机器人挂件 (Interactive Peeking Mascot)
- **极简科技造型**：
  - 放置在提示词胶囊右下方、会话输入框右上边缘，采用猫耳天线与蓝色发光面罩造型，去除头顶多余的喇叭/信号指示灯气泡，保持纯净高级感。
- **生命感悬浮呼吸动效**：
  - 机器人本体承担就绪指示，执行 3 秒周期的悬浮微浮动（`translateY: 0px ~ -4px`），并叠加底部科技蓝柔和光晕（Cyan Drop Shadow）周期性淡入淡出，呈现悬停待命的生命感。
- **悬停弹性微交互 (Hover Feedback)**：
  - 鼠标划过机器人时，触发 `translateY(-6px) scale(1.08)` 弹性轻快微上浮；
  - 面罩眼眸亮度与尺寸同步放大点亮（`#67E8F9`），微笑嘴线曲率加大，带来生动有趣的桌面 AI 伴侣反馈。

---

### 4. Windows 原生系统级深度品牌对齐 (OS Native Integration)
彻底杜绝桌面端各系统交互死角遗留官方旧名称与旧图标：
- **右下角系统托盘 (System Tray)**：
  - **原生托盘图标 (`tray.ico`)**：输出包含 16×16、20×20、24×24、32×32、40×40、48×48、64×64 七种主流分辨率的 32 位 ARGB 透明背景 Windows ICO 图标；
  - **托盘文字与上下文菜单**：悬停气泡提示（Tooltip）以及托盘右键菜单（打开、退出、关于）均深度对齐为 **`TPCowork`**。
- **底部运行任务栏 (Taskbar) 与窗口标题**：
  - **任务栏缩略图预览标题**：前端插件通过全局 `document.title = 'TPCowork'` 与 DOM MutationObserver 实时锁定，底层核心 HTML 入口同步固化，彻底解决任务栏悬浮预览出现旧名称的问题；
  - **运行窗口图标 (`WM_SETICON`)**：主进程创建窗口时显式绑定 `icon: "resources/tray.ico"`，强制 Windows 将运行态任务栏按钮与预览左上角小图标全部渲染为 TPCowork 标识。
- **桌面快捷方式与资源统一**：
  - 桌面与开始菜单中的快捷方式（`DeepSeek Harness.lnk`）图标指针自动更新为 `tray.ico`；
  - 输出配套的 `resources/icon.png` 备用资源。

### 5. Windows 桌面安装包全链路定制 (Desktop Installer Branding)
- **安装包文件名动态控制**：
  - 在 `package.json` 的 `dsh.brand` 字段中声明 `artifactPrefix: "tpcowork"` 与 `productName: "TPCowork"`；
  - 宿主打包工具链（`electron-builder`）自动识别并生成 `tpcowork-${version}-${os}-${arch}...exe`，彻底替换默认的 `deepseek-harness-...`。
- **安装程序系统级产品名**：
  - 安装界面引导标题、默认安装文件夹（`Programs/TPCowork`）以及桌面与开始菜单快捷方式（`TPCowork.lnk`）全面自动化统一为 `TPCowork`。

---

## 🛠️ 项目目录结构

```text
ui-brand-tpcowork/
├── src/
│   ├── index.ts                 # Node 端插件入口（提供给 Cordis Loader 注册）
│   └── client/
│       ├── index.ts             # 浏览器/渲染进程入口（注册插槽与 document.title 锁定）
│       ├── Brand.tsx            # 侧边栏矢量徽标、字标与 Hero 槽位挂载
│       └── HeroSection.tsx      # 对标 WorkBuddy 的首屏、场景 Tabs、胶囊及伴侣机器人组件
├── docs/
│   └── adr/
│       ├── 0001-tpcowork-hero-and-tray.md # 首屏微调与系统托盘定制
│       ├── 0002-bypass-welcome-window.md  # 绕过欢迎弹窗与首屏密钥快捷配置
│       └── 0003-desktop-installer-branding-contract.md # 安装包与产品品牌契约化定制
├── lib/
│   ├── index.js                 # 编译后的 Node 端入口
│   ├── client.js                # 编译打包后的前端运行时代码（带 ModuleLoader 外壳）
│   └── client.cjs               # CommonJS 格式副本
├── cordis.patch.yml             # Cordis 插件依赖声明与补丁配置
├── tray.ico                     # 7 种尺寸多分辨率 Windows 托盘与窗口 ICO 图标
├── tsdown.config.mjs            # 基于 Rolldown 的双端打包配置
├── tsconfig.json                # TypeScript 编译配置
└── package.json                 # 模块元数据与 DSH Client 注入契约
```

---

## 🚀 构建与部署指南

### 1. 编译构建
本项目使用 `tsdown` (基于 Rolldown) 执行快速打包：
```bash
# 执行打包构建
pnpm bundle
# 或使用全局/内嵌工具链
npx tsdown
```
构建产物将输出至 `lib/index.js` 与 `lib/client.js`。

### 2. 插件挂载方式
本插件以软链接或 npm 包的形式安装至用户配置目录：
```text
~/.dsh/profiles/desktop/node_modules/@tpcowork/ui-brand-tpcowork
```
并在客户端的 `cordis.patch.yml` 中声明挂载，实现客户端启动时自动加载。

---

## 🛡️ 架构契约与升级兼容性

1. **零侵入原则**：UI 层面 100% 通过官方提供的 Extension Slots 注入，不魔改官方上游 React 源码；
2. **定长安全补丁**：针对系统托盘与任务栏的底层配置注入，严格遵循等长替换与 SHA256 校验重算规则，不破坏 ASAR 包的文件偏移，原生稳定运行；
3. **跨版本升级**：当上游内核升级时，业务逻辑与会话引擎可无缝迭代，TPCowork 品牌插槽与视觉资产可持续平滑复用。
