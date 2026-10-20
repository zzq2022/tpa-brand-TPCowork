/// <reference types="react" />
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import { TPCoworkHeroSection } from './HeroSection'

/** Props for internal brand mark rendering. */
export interface InternalBrandMarkProps {
  size?: number | undefined
  className?: string | undefined
}

/**
 * TPCowork custom brand mark SVG:
 * Modern high-tech emblem featuring stylized "TP" geometry with radiant gradient accents.
 */
export function TPCoworkBrandMark({ size = 24, className }: InternalBrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="tpcowork-grad-main" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="tpcowork-grad-accent" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Background squircle */}
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#tpcowork-grad-main)" />

      {/* "T" element */}
      <path
        d="M6 7H12.5V8.8H10.1V16.5H8.3V8.8H6V7Z"
        fill="#FFFFFF"
      />

      {/* "P" element */}
      <path
        d="M12.8 7H16.2C17.65 7 18.7 7.95 18.7 9.4C18.7 10.85 17.65 11.8 16.2 11.8H14.6V16.5H12.8V7ZM14.6 10.3H16C16.8 10.3 17.2 9.9 17.2 9.4C17.2 8.9 16.8 8.5 16 8.5H14.6V10.3Z"
        fill="#FFFFFF"
      />

      {/* Modern dot accent */}
      <circle cx="17.2" cy="6.2" r="1.3" fill="url(#tpcowork-grad-accent)" />
    </svg>
  )
}

/**
 * TPCowork sidebar mark occupant for the navigation rail and sidebar header.
 */
export function TPCoworkSidebarBrandMark({ size }: SidebarBrandMarkOwnerProps) {
  return <TPCoworkBrandMark size={size} />
}

/**
 * TPCowork hero mark occupant for the conversation empty hero.
 * Renders the full WorkBuddy-style Hero section.
 */
export function TPCoworkHeroBrandMark(_props: HeroBrandMarkOwnerProps) {
  return <TPCoworkHeroSection />
}

/**
 * TPCowork brand name wordmark:
 * Clean, modern typography with "TP" in primary ink and "Cowork" in brand electric blue.
 */
export function TPCoworkBrandName() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: 700,
        fontSize: '17px',
        letterSpacing: '-0.025em',
        userSelect: 'none',
        lineHeight: '24px',
      }}
    >
      <span style={{ color: 'var(--dsw-alias-label-primary, #ffffff)' }}>TP</span>
      <span
        style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginLeft: '1.5px',
          fontWeight: 600,
        }}
      >
        Cowork
      </span>
    </span>
  )
}
