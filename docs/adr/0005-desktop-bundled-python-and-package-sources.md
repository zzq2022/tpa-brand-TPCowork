# ADR 0005: 桌面端内置 Python 运行时与包管理器源定制契约

## 状态
已接受 (Accepted) - 2026-10-20

## 背景
用户期望将 DeepSeek Harness 桌面端打包生成的 Windows 安装程序（NSIS 安装包）深度适配为企业内网专用的 `TPCowork` 客户端。
此前已完成：
1. 会话首屏与系统托盘图标定制（ADR 0001）；
2. 启动拦截欢迎窗口与引导流程旁路（ADR 0002）；
3. 安装包与产品品牌契约化定制（ADR 0003）；
4. 预置内网大模型网关与开箱即用免配置契约（ADR 0004）。

在离线与自动化执行场景下，客户端仍有两个核心诉求：
1. **Python 运行环境解耦打包**：原本宿主项目无内置 Python，需由定制插件（`@tpcowork/ui-brand-tpcowork`）维护完整的离线 Python 运行时（存放于插件的 `resources/python`），且在宿主执行 `pnpm run package:win:x64` 打包时能够被自动检测并打包进安装包（exe）的 `resources` 中；
2. **内网包管理器源（pip / npm）预设与生效**：在内网办公环境中，公网源不可达。需参考原版 `TPCowork` 机制，将默认的 npm 镜像源（`http://10.94.211.66/repository/npm_mirror/`）和 pip 镜像源（`http://10.94.211.66/repository/officialPypi/simple/`）预设至运行时中，在 Agent 执行命令时不污染宿主机全局配置的前提下自动生效，并允许用户后续覆盖。

## 机制分析与设计

### 1. 宿主端 Python 资源契约化发现 (`prepare-primary-runtime.ts`)
- 宿主原本的 `apps/desktop/scripts/prepare-primary-runtime.ts` 仅检测固定目录 `apps/desktop/resources/python`。
- 与 ADR 0003 中的 `resolveBrandResource` 对齐，新增 `resolveCustomPythonDir()` 探测链：
  1. 优先读取环境变量 `DSH_PYTHON_RESOURCE_DIR`；
  2. 扫描已挂载的品牌插件包（`packages/client/tpa-brand-TPCowork`），读取其 `package.json` 中的 `dsh.runtime.python` 声明或直接探测其 `resources/python` 目录；
  3. 回退探测宿主原有的 `apps/desktop/resources/python`。
- 探测到本地 Python 目录后，将其作为 `pythonSource` 传入原生的 `preparePayload`，自动提取 Python 版本及已安装的第三方依赖清单写入 `runtime.json`，并制作软链接/复制到主运行时目录，最终由 `electron-builder` 压入安装包。

### 2. 插件端包管理器源隔离注入机制 (`src/index.ts`)
- **零污染原则**：不修改开发者宿主机的 `~/.npmrc` 或 `pip.ini`。
- **运行时环境变量注入**：
  在插件 Node 进程入口中，向 Cordis `shellEnv` 或命令执行子进程环境注入以下默认值（若当前环境中未提供其他覆盖配置）：
  - `npm_config_registry`: `http://10.94.211.66/repository/npm_mirror/`
  - `PIP_INDEX_URL`: `http://10.94.211.66/repository/officialPypi/simple/`
  - `PIP_TRUSTED_HOST`: `10.94.211.66`（确保 HTTP 协议的内网私有源不被 pip 告警或拦截）
  - `UV_DEFAULT_INDEX` / `UV_INDEX_URL`: `http://10.94.211.66/repository/officialPypi/simple/`
  - `UV_INSECURE_HOST`: `10.94.211.66`
- **支持用户自由覆盖**：若用户在外网或特定环境显式指定了其他 Registry / Index，则优先采用用户配置。

## 决策记录

### 1. 插件端元数据配置 (`package.json`)
- 扩展 `dsh` 字段声明：
  ```json
  "dsh": {
    "runtime": {
      "python": "./resources/python"
    }
  }
  ```

### 2. 宿主端自动探测链扩展 (`prepare-primary-runtime.ts`)
- 保持宿主核心代码对具体业务名称解耦，通过探测约定与插件声明动态发现外部 Python 资源目录。

### 3. 环境变量注入
- 由插件在加载时提供默认的环境变量垫片，确保 Agent 执行 Shell 任务时开箱即连通内网镜像源。

## 影响评估
- **正向收益**：
  - 彻底解决了宿主代码库混入数百兆 Python 二进制的问题，将定制资产完整收归插件；
  - 达成桌面端打包自动化，一行命令直接生成内置 Python 与内网镜像源的纯离线客户端安装包；
  - 避免对开发者宿主机造成任何全局配置污染。
- **兼容性**：在未挂载本插件或未提供本地 Python 的环境下，构建脚本平滑回退到官方默认的在线下载与基础配置，不产生破坏性影响。
