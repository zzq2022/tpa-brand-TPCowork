//#region src/index.ts
const PRESET_API_KEY = "sk-rsjkBOmdfQtzfc382d4e8cC1F5084dEb819c30FcD6C23a4f";
const PRESET_PROVIDER = "tpa-default";
const PRESET_MODEL = "deepseek_v4_flash";
/**
* TPCowork browser-brand plugin, node half.
*
* 1. 拦截 Cordis credentials 服务：
*    - describe(ref): 返回凭据就绪状态，使桌面端 needsWelcome 判定为 false，直接进入主会话窗口并跳过引导向导；
*    - resolve(ref): 真实凭据优先。当底层未配置或缺失时，对 TPCOWORK_API_KEY 透明回退
*      返回预置内网大模型密钥，达成最终用户安装后 100% 开箱即用。
* 2. 注入 Cordis agentDefaultModel 服务：
*    - currentSelection(): 当当前仍处于官方默认状态时，自动路由至预置的 tpcowork-local / deepseek_v4_flash。
*/
function apply(ctx) {
	ctx.inject(["credentials"], (scope) => {
		if (!scope.credentials) return;
		if (scope.credentials.describe) {
			const originalDescribe = scope.credentials.describe.bind(scope.credentials);
			scope.credentials.describe = async (ref) => {
				if ((typeof ref === "string" ? ref : ref?.key) === "TPCOWORK_API_KEY") return {
					configured: true,
					writable: true
				};
				const info = await originalDescribe(ref);
				if (!info?.configured) return {
					...info,
					configured: true,
					writable: true
				};
				return info;
			};
		}
		if (scope.credentials.resolve) {
			const originalResolve = scope.credentials.resolve.bind(scope.credentials);
			scope.credentials.resolve = async (ref) => {
				const hit = await originalResolve(ref);
				if (hit?.value && hit.value.length > 0) return hit;
				if ((typeof ref === "string" ? ref : ref?.key) === "TPCOWORK_API_KEY") return {
					value: PRESET_API_KEY,
					writable: true,
					source: "preset"
				};
				return hit;
			};
		}
	});
	ctx.inject(["agentDefaultModel"], (scope) => {
		if (!scope.agentDefaultModel?.currentSelection) return;
		const originalCurrent = scope.agentDefaultModel.currentSelection.bind(scope.agentDefaultModel);
		scope.agentDefaultModel.currentSelection = () => {
			const current = originalCurrent();
			if (!current || current.provider === "deepseek-official" && current.model === "deepseek-flash") return {
				provider: PRESET_PROVIDER,
				model: PRESET_MODEL
			};
			return current;
		};
	});
}
//#endregion
export { PRESET_API_KEY, PRESET_MODEL, PRESET_PROVIDER, apply };
