import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client';
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
/** Props for internal brand mark rendering. */
export interface InternalBrandMarkProps {
    size?: number | undefined;
    className?: string | undefined;
}
/**
 * TPCowork custom brand mark SVG:
 * Modern high-tech emblem featuring stylized "TP" geometry with radiant gradient accents.
 */
export declare function TPCoworkBrandMark({ size, className }: InternalBrandMarkProps): import("react").JSX.Element;
/**
 * TPCowork sidebar mark occupant for the navigation rail and sidebar header.
 */
export declare function TPCoworkSidebarBrandMark({ size }: SidebarBrandMarkOwnerProps): import("react").JSX.Element;
/**
 * TPCowork hero mark occupant for the conversation empty hero.
 */
export declare function TPCoworkHeroBrandMark({ size, className }: HeroBrandMarkOwnerProps): import("react").JSX.Element;
/**
 * TPCowork brand name wordmark:
 * Clean, modern typography with "TP" in primary ink and "Cowork" in brand electric blue.
 */
export declare function TPCoworkBrandName(): import("react").JSX.Element;
//# sourceMappingURL=Brand.d.ts.map