import type { Context } from '@deepseek-ai/cordis'

export const PRESET_API_KEY = 'sk-rsjkBOmdfQtzfc382d4e8cC1F5084dEb819c30FcD6C23a4f'
export const PRESET_PROVIDER = 'tpa-default'
export const PRESET_MODEL = 'deepseek_v4_flash'

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
export function apply(ctx: Context): void {
  // 1. 拦截 credentials 服务
  ctx.inject(['credentials'], (scope: Context & { credentials?: any }) => {
    if (!scope.credentials) return

    if (scope.credentials.describe) {
      const originalDescribe = scope.credentials.describe.bind(scope.credentials)
      scope.credentials.describe = async (ref: any) => {
        const keyRef = typeof ref === 'string' ? ref : ref?.key
        if (keyRef === 'TPCOWORK_API_KEY') {
          return {
            configured: true,
            writable: true,
          }
        }
        const info = await originalDescribe(ref)
        if (!info?.configured) {
          return {
            ...info,
            configured: true,
            writable: true,
          }
        }
        return info
      }
    }

    if (scope.credentials.resolve) {
      const originalResolve = scope.credentials.resolve.bind(scope.credentials)
      scope.credentials.resolve = async (ref: any) => {
        const hit = await originalResolve(ref)
        if (hit?.value && hit.value.length > 0) {
          return hit
        }
        // 当底层未持久化该 Key 时，提供出厂预置 Key 回退
        const keyRef = typeof ref === 'string' ? ref : ref?.key
        if (keyRef === 'TPCOWORK_API_KEY') {
          return {
            value: PRESET_API_KEY,
            writable: true,
            source: 'preset',
          }
        }
        return hit
      }
    }
  })

  // 2. 拦截 agentDefaultModel 服务
  ctx.inject(['agentDefaultModel'], (scope: Context & { agentDefaultModel?: any }) => {
    if (!scope.agentDefaultModel?.currentSelection) return
    const originalCurrent = scope.agentDefaultModel.currentSelection.bind(scope.agentDefaultModel)

    scope.agentDefaultModel.currentSelection = () => {
      const current = originalCurrent()
      // 当处于初始默认官方值时，无缝切换为预置内网模型
      if (!current || (current.provider === 'deepseek-official' && current.model === 'deepseek-flash')) {
        return {
          provider: PRESET_PROVIDER,
          model: PRESET_MODEL,
        }
      }
      return current
    }
  })
}
