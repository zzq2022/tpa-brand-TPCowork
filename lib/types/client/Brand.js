import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * TPCowork custom brand mark SVG:
 * Modern high-tech emblem featuring stylized "TP" geometry with radiant gradient accents.
 */
export function TPCoworkBrandMark({ size = 24, className }) {
    return (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: className, "aria-hidden": "true", style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "tpcowork-grad-main", x1: "2", y1: "2", x2: "22", y2: "22", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { offset: "0%", stopColor: "#2563EB" }), _jsx("stop", { offset: "100%", stopColor: "#1D4ED8" })] }), _jsxs("linearGradient", { id: "tpcowork-grad-accent", x1: "5", y1: "5", x2: "19", y2: "19", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { offset: "0%", stopColor: "#60A5FA" }), _jsx("stop", { offset: "100%", stopColor: "#3B82F6" })] })] }), _jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5.5", fill: "url(#tpcowork-grad-main)" }), _jsx("path", { d: "M6 7H12.5V8.8H10.1V16.5H8.3V8.8H6V7Z", fill: "#FFFFFF" }), _jsx("path", { d: "M12.8 7H16.2C17.65 7 18.7 7.95 18.7 9.4C18.7 10.85 17.65 11.8 16.2 11.8H14.6V16.5H12.8V7ZM14.6 10.3H16C16.8 10.3 17.2 9.9 17.2 9.4C17.2 8.9 16.8 8.5 16 8.5H14.6V10.3Z", fill: "#FFFFFF" }), _jsx("circle", { cx: "17.2", cy: "6.2", r: "1.3", fill: "url(#tpcowork-grad-accent)" })] }));
}
/**
 * TPCowork sidebar mark occupant for the navigation rail and sidebar header.
 */
export function TPCoworkSidebarBrandMark({ size }) {
    return _jsx(TPCoworkBrandMark, { size: size });
}
/**
 * TPCowork hero mark occupant for the conversation empty hero.
 */
export function TPCoworkHeroBrandMark({ size, className }) {
    return _jsx(TPCoworkBrandMark, { size: size, className: className });
}
/**
 * TPCowork brand name wordmark:
 * Clean, modern typography with "TP" in primary ink and "Cowork" in brand electric blue.
 */
export function TPCoworkBrandName() {
    return (_jsxs("span", { style: {
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 700,
            fontSize: '17px',
            letterSpacing: '-0.025em',
            userSelect: 'none',
            lineHeight: '24px',
        }, children: [_jsx("span", { style: { color: 'var(--dsw-alias-label-primary, #ffffff)' }, children: "TP" }), _jsx("span", { style: {
                    background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginLeft: '1.5px',
                    fontWeight: 600,
                }, children: "Cowork" })] }));
}
//# sourceMappingURL=Brand.js.map