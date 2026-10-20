import { TPCoworkSidebarBrandMark, TPCoworkBrandName, TPCoworkHeroBrandMark } from "./Brand.js";
/** Required service: the UI slot registry. */
export const inject = ['slots'];
/**
 * Register TPCowork brand occupants into sidebar brand slots and conversation hero slot.
 * @param ctx - Client root context.
 */
export function apply(ctx) {
    // 1. 侧边栏品牌槽位 (包含展开态的 Logo + Name，以及收起 Rail 态的 Mark)
    ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.inject('sidebar.brand.name', function* () {
        yield ctx.slots.register({ name: 'sidebar.brand.mark', priority: -100 }, TPCoworkSidebarBrandMark);
        yield ctx.slots.register({ name: 'sidebar.brand.name', priority: -100 }, TPCoworkBrandName);
    }));
    // 2. 会话首屏空白页中间的品牌槽位 (替换默认动画鲸鱼)
    ctx.slots.inject('conversation.hero.brand.mark', function* () {
        yield ctx.slots.register({ name: 'conversation.hero.brand.mark', priority: -100 }, TPCoworkHeroBrandMark);
    });
}
//# sourceMappingURL=index.js.map