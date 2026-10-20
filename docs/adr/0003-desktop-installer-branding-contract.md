# ADR 0003: 桌面端安装包与产品品牌契约化定制

## 状态
已接受 (Accepted) - 2026-10-12

## 背景
用户期望将 DeepSeek Harness 桌面端打包生成的 Windows 安装程序（NSIS 安装包）全面定制为 `TPCowork` 品牌。
此前已完成：
1. 会话首屏与系统托盘图标定制（ADR 0001）；
2. 启动拦截欢迎窗口与引导流程旁路（ADR 0002）。

在打包阶段，原版 `apps/desktop/scripts/electron-builder-config.mjs` 硬编码了产品名称 `productName: 'DeepSeek Harness'` 以及安装包产物命名 `artifactName: 'deepseek-harness-${version}-${os}-${arch}...'`。导致生成的安装包文件名为 `deepseek-harness-...exe`，且安装界面、安装目录与快捷方式仍显示为原版名称。

用户需求：
1. 生成的 Windows 安装文件名由 `deepseek-harness` 改为 `tpcowork`（如 `tpcowork-0.2.1-alpha.2-win-x64-unsigned.exe`）；
2. 产品展示名全面同步为 `TPCowork`，使安装程序引导界面、安装目录（`Programs/TPCowork`）以及桌面与开始菜单快捷方式（`TPCowork.lnk`）全面统一；
3. 改动由本插件项目（`@tpcowork/ui-brand-tpcowork`）驱动，通过元数据契约解耦，在未挂载定制品牌插件时宿主仍可安全回退到官方默认名称。

## 机制分析与设计

1. **元数据声明契约**：
   - 在本插件 `package.json` 的 `dsh` 字段中扩展 `brand` 配置：
     ```json
     "dsh": {
       "brand": {
         "productName": "TPCowork",
         "artifactPrefix": "tpcowork"
       }
     }
     ```
2. **宿主打包配置动态解析**：
   - 在宿主 `apps/desktop/scripts/electron-builder-config.mjs` 中新增 `resolveBrandMetadata()` 辅助函数；
   - 自动扫描环境配置 `DSH_BRAND_RESOURCE_DIR` 或已链接的品牌插件目录（`packages/client/ui-brand-tpcowork`），安全读取其 `package.json` 中的 `dsh.brand` 声明；
   - 若检测到 `dsh.brand.productName` 与 `dsh.brand.artifactPrefix`，则动态注入到 `electron-builder` 配置中：
     - `productName`: `'TPCowork'`（驱动安装包标题、窗口协议名、安装目录及系统快捷方式）
     - `artifactName`: `${artifactPrefix}-\${version}-\${os}-\${arch}...`（驱动生成的 exe 安装文件名）
   - 若未提供品牌定制包，平滑回退至官方默认值 `'DeepSeek Harness'` 与 `'deepseek-harness'`，无破坏性破坏。

## 决策记录

### 1. 插件端元数据配置 (`package.json`)
- 显式声明 `dsh.brand.productName = "TPCowork"` 与 `dsh.brand.artifactPrefix = "tpcowork"`。

### 2. 宿主端动态契约挂载 (`electron-builder-config.mjs`)
- 扩展品牌资源与元数据探测链，将品牌命名权下放给品牌定制插件。
- 联动 `protocols: [{ name: productName, schemes: ['dsh'] }]` 保持应用协议与产品名完全一致。

## 影响评估
- **正向收益**：彻底打通桌面端安装包生成的最后一道品牌定制关卡，从打包输出的文件名、安装界面的品牌展示、系统托盘到运行主界面，实现 100% 完整的 TPCowork 专属品牌闭环。
- **架构兼容性**：基于轻量元数据契约与可选回退机制，宿主与插件保持低耦合，未来跟随上游合并时具备极高稳健性。
