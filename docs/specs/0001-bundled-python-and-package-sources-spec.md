# 需求规格说明书：桌面端内置 Python 运行时与包管理器源定制

## 问题陈述 (Problem Statement)

当前 DeepSeek Harness 桌面端在面向企业内网环境（如 TPCowork 协作场景）分发与使用时，面临两个核心阻塞痛点：
1. **Python 运行环境与宿主强绑定**：原本宿主项目依赖在线下载或在 `apps/desktop/resources/python` 中手动塞入本地 Python 运行时，造成宿主代码库臃肿、无法与第三方开源代码平滑对齐；且用户需要把定制的离线 Python 运行环境交由定制插件（`tpa-brand-TPCowork`）维护，实现插件即插即用、宿主零脏代码。
2. **内网包管理器源缺失导致 Agent 任务执行失败**：在内网隔离环境中，系统默认的公网 npm 与 PyPI 源不可达。当 Agent 尝试使用 Python 或 Node/npm 安装第三方依赖、执行数据分析或脚本自动化时，因缺少内网 Nexus 镜像源配置而报错超时，迫使用户手动干预配置环境。

## 解决方案 (Solution)

1. **宿主打包工具链契约化发现**：扩展宿主 `apps/desktop/scripts/prepare-primary-runtime.ts` 的运行时探测链，优先动态读取已挂载插件包（`@tpcowork/ui-brand-tpcowork`）声明的 Python 资源（`resources/python`），在执行桌面端打包（`pnpm run package:win:x64`）时，自动将其整合进客户端主安装包中，产出开箱即自带完整 Python 环境的 Windows 安装程序（exe）。
2. **插件端运行时无污染环境注入**：借鉴并对齐 TPCowork 的成熟机制，由 `tpa-brand-TPCowork` 插件在 Node 端生命周期中，向 Agent 执行命令的进程环境动态注入内网镜像源变量：
   - npm 默认源：`npm_config_registry=http://10.94.211.66/repository/npm_mirror/`
   - pip 默认源：`PIP_INDEX_URL=http://10.94.211.66/repository/officialPypi/simple/`
   - pip 信任主机：`PIP_TRUSTED_HOST=10.94.211.66`
   - 不修改开发者系统全局的 `.npmrc` 或 `pip.ini`，避免污染开发宿主机；
   - 保持高容灾性：若检测到用户显式配置了自定义源，则优先采用用户配置，兼顾离线默认与外网自定义灵活性。

## 用户故事 (User Stories)

1. 作为一个最终桌面端用户，我想要安装并直接启动 TPCowork.exe，以便在完全没有预装 Python 的纯净 Windows 机器上直接使用 Python 数据分析与代码自动化功能。
2. 作为一个内网办公用户，我想要 Agent 在运行 pip 安装依赖时自动从内网 Nexus 镜像源下载，以便依赖安装能毫秒级完成且无需连通外网。
3. 作为一个内网办公用户，我想要 Agent 在运行 npm 安装依赖时自动使用内网 npm 镜像源，以便前端脚本与 Node 命令行工具即开即用。
4. 作为一个经常出差或切换网络的用户，我想要在有需要时能自定义覆盖 pip/npm 源，以便在接入公网时依然能正常拉取公网公共包。
5. 作为一个客户端开发与维护人员，我想要将所有 TPCowork 专属的大文件资产（如数百兆的内置 Python）与定制配置集中存放在 `packages/client/tpa-brand-TPCowork` 插件内，以便宿主主仓库保持整洁与上游同步零冲突。
6. 作为一个构建发布人员，我想要执行一次统一的 `pnpm run package:win:x64` 命令，以便打包工具链自动检测并打包插件中的 Python 环境，生成完整的离线安装包。
7. 作为一个注重系统洁净的开发者，我想要本软件运行及 Agent 执行任务时绝不篡改我本机 `%USERPROFILE%\.npmrc` 和 `pip.ini`，以便不影响我机器上其他本地开发工程。
8. 作为一个审计与合规人员，我想要所有涉及内网源地址与私有环境的改动均有清晰的 ADR 设计决策记录，以便后续技术追溯与权限管理。

## 实施决策 (Implementation Decisions)

1. **模块与职责划分**：
   - **`@tpcowork/ui-brand-tpcowork` 插件包**：
     - 在 `package.json` 的 `dsh` 元数据中增加 `runtime.python` 契约声明：`"python": "./resources/python"`；
     - 物理文件存放在 `packages/client/tpa-brand-TPCowork/resources/python`；
     - 在插件 Node 入口（`src/index.ts`）中注册 Shell / 子进程环境变量拦截，注入 `npm_config_registry`、`PIP_INDEX_URL`、`PIP_TRUSTED_HOST` 等内网默认源（若用户未配置覆盖）。
   - **宿主打包工具链 (`apps/desktop/scripts/prepare-primary-runtime.ts`)**：
     - 新增 `resolveCustomPythonDir()` 探测方法：按顺序探测 `process.env.DSH_PYTHON_RESOURCE_DIR` -> 品牌插件目录（`tpa-brand-TPCowork/resources/python`） -> 宿主原有相对目录；
     - 探测到有效 Python 后，透明传入 `preparePayload({ ..., pythonSource })`。
2. **接口与契约规范**：
   - 契约设计与 ADR 0003（`resolveBrandMetadata` / `resolveBrandResource`）保持完全对称风格；
   - 环境变量注入遵循不覆盖显式非空传入值的原则，提供默认回退（Fallback）。
3. **架构防污染与安全性**：
   - 严禁在代码中写死向 Windows 注册表、全局 AppData 或用户根目录写入永久配置文件的逻辑；
   - 仅在子进程启动参数（`env`）中进行运行时注入。

## 测试决策 (Testing Decisions)

1. **测试边界与高质量测试准则**：
   - 测试仅验证外部可观测行为，不绑定内部私有实现；
   - 关键验证点包含两大切面：打包期探测切面（Packaging Seam）与运行时环境变量切面（Runtime Environment Seam）。
2. **打包期探测验证**：
   - 执行 `pnpm --filter @deepseek-ai/dsh-desktop run prepare:primary-runtime`；
   - 验证日志提示使用自定义 Python 资源，且生成的 `.desktop-build/runtime/primary-runtime/dependencies/python/python.exe` 存在、`runtime.json` 包含该 Python 的版本号与依赖清单。
3. **运行时环境变量验证**：
   - 验证由插件注入的默认环境变量正确挂载至执行上下文，且现有环境变量或用户显式配置不受破坏。

## 明确不做的内容 (Out of Scope)

1. 不在打包工具链中为其它操作系统（如 macOS、Linux）打包该 Windows 专属 Python 运行时；
2. 不修改任何开发者个人机器上的全局配置文件（如 `~/.npmrc`、`pip.ini` 等）；
3. 不为其它第三方非 TPCowork 品牌插件提供专有的硬编码路径。

## 补充说明 (Further Notes)

- 伴随本规格同时交付架构决策记录 `ADR 0005: 桌面端内置 Python 运行时与包管理器源定制契约`。
