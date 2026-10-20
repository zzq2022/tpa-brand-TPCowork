/** TPCowork brand occupants for the DeepSeek Harness UI slots. */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { TPCoworkSidebarBrandMark, TPCoworkBrandName, TPCoworkHeroBrandMark } from './Brand'

/** Required service: the UI slot registry. */
export const inject = ['slots']

/**
 * Ensure document.title is always pinned to TPCowork so Windows taskbar preview
 * and titlebar reliably present TPCowork branding.
 */
function enforceDocumentTitle(): void {
  if (typeof document === 'undefined') return
  document.title = 'TPCowork'
  const titleEl = document.querySelector('title')
  if (titleEl) {
    titleEl.textContent = 'TPCowork'
    const observer = new MutationObserver(() => {
      if (document.title !== 'TPCowork') {
        document.title = 'TPCowork'
      }
    })
    observer.observe(titleEl, { childList: true, characterData: true, subtree: true })
  }
}

enforceDocumentTitle()

/**
 * Register TPCowork brand occupants into sidebar brand slots and conversation hero slot.
 * @param ctx - Client root context.
 */
export function apply(ctx: ClientContext): void {
  enforceDocumentTitle()

  // 1. 侧边栏品牌槽位 (包含展开态的 Logo + Name，以及收起 Rail 态的 Mark)
  ctx.slots.inject('sidebar.brand.mark', () =>
    ctx.slots.inject('sidebar.brand.name', function* () {
      yield ctx.slots.register({ name: 'sidebar.brand.mark', priority: -100 }, TPCoworkSidebarBrandMark)
      yield ctx.slots.register({ name: 'sidebar.brand.name', priority: -100 }, TPCoworkBrandName)
    }))

  // 2. 会话首屏空白页中间的品牌槽位 (替换默认动画鲸鱼)
  ctx.slots.inject('conversation.hero.brand.mark', function* () {
    yield ctx.slots.register({ name: 'conversation.hero.brand.mark', priority: -100 }, TPCoworkHeroBrandMark)
  })
}
