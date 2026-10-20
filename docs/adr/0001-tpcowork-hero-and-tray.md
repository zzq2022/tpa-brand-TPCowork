# ADR 0001: TPCowork 会话首屏微调与系统托盘品牌定制

## 状态
已接受 (Accepted) - 2026-10-11

## 背景
用户期望将 DeepSeek Harness 桌面端（DSH Desktop）打造为定制化的 TPCowork 专属客户端。此前已完成了侧边栏品牌槽位的无侵入式替换。本阶段参考 WorkBuddy 优秀的人机交互体验，对客户端的**会话首屏（Hero Page）**与**Windows 桌面右下角系统托盘图标（Tray Icon）**进行精细化改造。

## 决策记录

### 1. 首屏主标与场景分类导航 (Hero Slogan & Categories)
- **标题文案**：使用统一的亲和力标语 `TPCowork, 我帮你`，彻底屏蔽隐藏原版官方的「探索未至之境」与「预览版」文字徽标。
- **场景分类 Tab**：提供三类高频办公与研发场景：
  1. `☕ 日常办公`：聚焦财报分析、周报总结、MD转PDF、竞品对比；
  2. `🌐 代码开发`：聚焦代码 Review、单测生成、自动化脚本、REST API 规范；
  3. `🎨 设计创意`：聚焦品牌营销、PRD 需求文档、视觉风格分析、爆款图文脚本。
- **交互行为**：点击不同分类 Tab 动态切换对应的提示词胶囊；点击任意胶囊自动向底层输入框（Lexical ContentEditable）注入结构化详细 Prompt，并聚焦光标。

### 2. 吉祥物挂件 (Mascot Peeking Avatar)
- 在输入框右上角放置 TPCowork 伴侣机器人吉祥物挂件，去除多余外挂喇叭/指示灯气泡，保持纯净头部轮廓与猫耳天线造型。
- **呼吸生命感**：由机器人本体直接承担待命就绪动效，采用 3s 周期悬浮微动（`translateY: 0px ~ -4px`）+ 底部科技蓝微光光晕（Cyan Drop Shadow）淡入淡出。
- **悬停微交互**：鼠标移入时响应 `translateY(-6px) scale(1.08)` 欢快微弹跳与蓝光强化，并扩大眼眸神态，提升桌面端交互温度与趣味度。

### 3. 系统任务栏托盘图标 (System Tray Icon)
- 在 `resources/tray.ico` 层面替换官方鲸鱼图标，提供适配 16x16 / 20x20 / 24x24 / 32x32 / 40x40 / 48x48 / 64x64 等全尺寸高对比度透明背景 TPCowork 矢量图标。
- 备份原 `tray.ico` 为 `tray.ico.bak`，保留回退能力。

### 4. Windows 任务栏与窗口品牌统一 (Taskbar & Window Branding)
- **窗口标题锁定**：在 `@tpcowork/ui-brand-tpcowork` 客户端挂载中加入全局 `document.title = 'TPCowork'` 及 `MutationObserver` 监控，并在核心前端包入口 `index.html` 同步将 `<title>` 固化为 `TPCowork`，彻底消除任务栏缩略图预览处的旧名称。
- **运行窗口图标注入**：在主进程 `createWindow` 实例创建时显式传入 `title: "TPCowork"` 与 `icon: join(process.resourcesPath, "tray.ico")`，让窗口向 Windows 发送 `WM_SETICON` 消息，使任务栏运行按钮与预览左上角图标均显示 TPCowork 标识。
- **系统快捷方式更新**：将桌面与开始菜单 `DeepSeek Harness.lnk` 快捷方式的 `IconLocation` 指向 `D:\Programs\Dsh_home\resources\tray.ico`，并将 `resources/icon.png` 更新为 TPCowork 标志。

## 影响
- **正向收益**：客户端从系统托盘、任务栏运行态、窗口预览到首屏会话界面实现 100% 完整的 TPCowork 品牌沉浸感，无任何死角。
- **技术契约**：依托 DSH 官方 `conversation.hero.brand.mark` 槽位、前端无侵入式注入与资源轻量定长补丁，跨版本升级零代码冲突。
