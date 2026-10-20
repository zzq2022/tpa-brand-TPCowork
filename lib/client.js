window.__ModuleLoader__.load({ id: "@tpcowork/ui-brand-tpcowork", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/client/HeroSection.tsx
const CATEGORIES = [
	{
		key: "office",
		label: "日常办公",
		icon: "☕"
	},
	{
		key: "dev",
		label: "代码开发",
		icon: "🌐"
	},
	{
		key: "creative",
		label: "设计创意",
		icon: "🎨"
	}
];
const PROMPTS = {
	office: [
		{
			id: "fin-analysis",
			label: "财报分析全流程",
			tag: "财务分析",
			prompt: "帮我分析【上传的财务报表】，按以下步骤执行：1. 核心指标速览（营收、净利、毛利率及同比环比）；2. 盈利能力与偿债能力诊断；3. 异常变动数据预警；4. 总结投资或经营建议，输出 Markdown 表格与可视化图表建议。"
		},
		{
			id: "md-to-pdf",
			label: "MD转PDF文档",
			tag: "文档处理",
			prompt: "帮我把【上传的 Markdown 文件】转换成排版精美的 PDF 文档，要求：自定义封面页（标题 + 作者 + 日期）、自动生成目录、代码块带语法高亮、表格有交替行底色、页脚显示页码。"
		},
		{
			id: "competitor-analysis",
			label: "竞品对比分析",
			tag: "市场分析",
			prompt: "针对【目标产品及主要竞品】，从以下维度进行深度竞品对比分析：核心功能、目标客群、定价策略、市场口碑与优劣势矩阵，最后给出差异化破局建议，以结构化表格呈现。"
		},
		{
			id: "weekly-report",
			label: "项目周报转Word",
			tag: "办公协作",
			prompt: "帮我把本周工作要点整理成规范的项目周报，结构包括：本周重点进展、关键里程碑达成情况、存在风险与应对方案、下周工作计划，语言精炼专业。"
		}
	],
	dev: [
		{
			id: "code-review",
			label: "代码审查与优化",
			tag: "代码重构",
			prompt: "请对以下代码进行全面的 Code Review，关注：1. 潜在 Bug 与内存/资源泄漏；2. 性能瓶颈与算法优化；3. 代码风格与设计模式；4. 边界异常处理，并给出优化前后的 Diff 代码对照。"
		},
		{
			id: "unit-test",
			label: "前端组件单测编写",
			tag: "单元测试",
			prompt: "为【目标 React/Vue 组件】编写完整的 Vitest/Jest 单元测试，覆盖常见 Props 渲染、用户交互事件（点击/输入）、异步状态（加载/错误）及边缘分支条件，确保测试覆盖率 > 90%。"
		},
		{
			id: "crawler-script",
			label: "编写自动化爬虫脚本",
			tag: "脚本开发",
			prompt: "使用 Python / Node.js 编写一个高效稳健的数据抓取脚本，要求支持：自动处理分页、设置请求重试与反爬防封延时、提取结构化字段并清洗，最后导出为 Excel/JSON 格式。"
		},
		{
			id: "rest-api-design",
			label: "RESTful API 规范设计",
			tag: "架构设计",
			prompt: "为【业务模块】设计符合 RESTful 规范的后端 API 接口，包括：清晰的路由路径、请求方法、Query/Body 参数校验、标准统一的 JSON 返回结构及常见 HTTP 状态码说明。"
		}
	],
	creative: [
		{
			id: "marketing-copy",
			label: "品牌营销文案策划",
			tag: "文案策划",
			prompt: "为我们的新产品【TPCowork】撰写一套多渠道整合营销文案，包括：官网首页 Slogan、朋友圈宣发文案、产品发布会演讲提纲及 3 条核心卖点提炼，风格现代科技感且具有感染力。"
		},
		{
			id: "prd-write",
			label: "产品功能 PRD 撰写",
			tag: "产品设计",
			prompt: "为【新功能特性】撰写一份专业完整的产品需求文档（PRD），包含：功能背景、用户角色与使用场景、业务流程图（Mermaid）、功能详细规格说明、异常流程与数据埋点需求。"
		},
		{
			id: "visual-analysis",
			label: "竞品视觉风格分析",
			tag: "视觉研究",
			prompt: "对比分析业内头部产品的视觉风格体系，从色彩搭配、排版字阶、卡片质感、微交互动效到品牌调性，提炼出一套高级感的设计趋势总结与落地建议。"
		},
		{
			id: "xiaohongshu-script",
			label: "爆款小红书脚本",
			tag: "社交媒体",
			prompt: "写一篇高赞小红书爆款图文脚本，主题关于【程序员高效办公神兵利器】，包含：吸睛黄金前3秒标题、痛点共鸣引入、干货神器推荐（分步图解演示）、互动引导话术及热门标签。"
		}
	]
};
/** Injects prompt into Lexical contenteditable */
function injectPromptToComposer(prompt, tag) {
	const fullText = `[${tag}] ${prompt}`;
	const editorEl = document.querySelector("[data-input-scroll] [contenteditable=\"true\"]") || document.querySelector("div[contenteditable=\"true\"]") || document.querySelector("[data-composer-card] [contenteditable=\"true\"]");
	if (editorEl) {
		editorEl.focus();
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(editorEl);
		selection?.removeAllRanges();
		selection?.addRange(range);
		if (!document.execCommand("insertText", false, fullText)) {
			editorEl.textContent = fullText;
			editorEl.dispatchEvent(new InputEvent("input", {
				bubbles: true,
				cancelable: true,
				data: fullText
			}));
		}
		editorEl.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}
}
/** TPCowork Peeking Mascot Component */
function PeekingMascot() {
	const [hovered, setHovered] = (0, react.useState)(false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "tpcowork-mascot-container",
		style: {
			position: "absolute",
			right: "10px",
			bottom: "-10px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: 5,
			pointerEvents: "auto",
			userSelect: "none"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 48",
			width: "52",
			height: "40",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			onMouseEnter: () => setHovered(true),
			onMouseLeave: () => setHovered(false),
			style: {
				cursor: "pointer",
				transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease",
				animation: hovered ? "none" : "tpcowork-mascot-breathe 3s infinite ease-in-out",
				transform: hovered ? "translateY(-6px) scale(1.08)" : void 0,
				filter: hovered ? "drop-shadow(0 10px 22px rgba(56, 189, 248, 0.75))" : void 0
			},
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("polygon", {
					points: "12,18 20,4 28,14",
					fill: "#3B82F6"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("polygon", {
					points: "52,18 44,4 36,14",
					fill: "#3B82F6"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "8",
					y: "12",
					width: "48",
					height: "36",
					rx: "14",
					fill: "#1E293B",
					stroke: "#38BDF8",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "4",
					y: "20",
					width: "6",
					height: "18",
					rx: "3",
					fill: "#0EA5E9"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "54",
					y: "20",
					width: "6",
					height: "18",
					rx: "3",
					fill: "#0EA5E9"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "14",
					y: "18",
					width: "36",
					height: "22",
					rx: "8",
					fill: "#0F172A"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ellipse", {
					cx: "24",
					cy: "29",
					rx: hovered ? 4 : 3.5,
					ry: hovered ? 4.5 : 4,
					fill: hovered ? "#67E8F9" : "#22D3EE"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ellipse", {
					cx: "40",
					cy: "29",
					rx: hovered ? 4 : 3.5,
					ry: hovered ? 4.5 : 4,
					fill: hovered ? "#67E8F9" : "#22D3EE"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: hovered ? "M26 34 Q32 39 38 34" : "M28 35 Q32 38 36 35",
					stroke: "#38BDF8",
					strokeWidth: "1.8",
					strokeLinecap: "round",
					fill: "none"
				})
			]
		})
	});
}
/** Complete WorkBuddy-style Hero Section for TPCowork */
function TPCoworkHeroSection() {
	const [activeCategory, setActiveCategory] = (0, react.useState)("office");
	(0, react.useEffect)(() => {
		const styleId = "tpcowork-hero-overrides";
		let style = document.getElementById(styleId);
		if (!style) {
			style = document.createElement("style");
			style.id = styleId;
			document.head.appendChild(style);
		}
		style.textContent = `
      [class*="titleGroup"],
      [class*="previewBadge"],
      [class*="HeroShell_titleGroup"] {
        display: none !important;
      }
      [class*="fishHitbox"],
      [class*="HeroShell_fishHitbox"] {
        display: block !important;
        width: 100% !important;
        max-width: 860px !important;
        margin: 0 auto !important;
      }
      [class*="headline"],
      [class*="HeroShell_headline"] {
        display: block !important;
        width: 100% !important;
        max-width: 860px !important;
        margin: 0 auto !important;
      }
      [class*="stack"],
      [class*="HeroShell_stack"] {
        max-width: 860px !important;
      }
      @keyframes tpcowork-mascot-breathe {
        0%, 100% {
          transform: translateY(0px) scale(1);
          filter: drop-shadow(0 4px 12px rgba(37, 99, 235, 0.35));
        }
        50% {
          transform: translateY(-4px) scale(1.03);
          filter: drop-shadow(0 8px 20px rgba(56, 189, 248, 0.65));
        }
      }
    `;
	}, []);
	const handleChipClick = (0, react.useCallback)((item) => {
		injectPromptToComposer(item.prompt, item.tag);
	}, []);
	const [showKeyHint, setShowKeyHint] = (0, react.useState)(() => {
		try {
			return localStorage.getItem("tpcowork_show_key_hint") === "1";
		} catch {
			return false;
		}
	});
	const dismissKeyHint = (0, react.useCallback)(() => {
		setShowKeyHint(false);
		try {
			localStorage.removeItem("tpcowork_show_key_hint");
		} catch {}
	}, []);
	const openSettings = (0, react.useCallback)(() => {
		const btn = document.querySelector("button[aria-haspopup=\"dialog\"], div[class*=\"triggerRow\"] button, button[aria-label*=\"设置\"], button[aria-label*=\"Settings\"]");
		if (btn) btn.click();
		else window.dispatchEvent(new KeyboardEvent("keydown", {
			key: ",",
			code: "Comma",
			ctrlKey: true,
			bubbles: true
		}));
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: "100%",
			maxWidth: "820px",
			margin: "0 auto",
			paddingTop: "8px",
			boxSizing: "border-box",
			userSelect: "none"
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: "34px",
					fontWeight: 800,
					lineHeight: "44px",
					letterSpacing: "-0.02em",
					textAlign: "center",
					marginBottom: showKeyHint ? "14px" : "20px"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: {
						background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						marginRight: "8px"
					},
					children: "TPCowork"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: { color: "var(--dsw-alias-label-primary, #F8FAFC)" },
					children: ", 我帮你"
				})]
			}),
			showKeyHint && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: "8px",
					padding: "4px 12px 4px 14px",
					borderRadius: "999px",
					backgroundColor: "rgba(56, 189, 248, 0.08)",
					border: "1px solid rgba(56, 189, 248, 0.25)",
					marginBottom: "18px",
					fontSize: "12px",
					color: "#38BDF8",
					userSelect: "none",
					backdropFilter: "blur(8px)"
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: { fontSize: "13px" },
						children: "💡"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "尚未配置模型密钥？可随时前往设置" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openSettings,
						style: {
							background: "rgba(56, 189, 248, 0.2)",
							border: "none",
							color: "#FFFFFF",
							padding: "2px 8px",
							borderRadius: "6px",
							cursor: "pointer",
							fontSize: "11px",
							fontWeight: 600,
							transition: "background 0.15s ease"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.background = "rgba(56, 189, 248, 0.4)";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.background = "rgba(56, 189, 248, 0.2)";
						},
						children: "前往配置 →"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: dismissKeyHint,
						title: "隐藏提示",
						style: {
							background: "transparent",
							border: "none",
							color: "#94A3B8",
							cursor: "pointer",
							fontSize: "14px",
							padding: "0 2px",
							lineHeight: 1,
							marginLeft: "2px"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.color = "#FFFFFF";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.color = "#94A3B8";
						},
						children: "×"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: {
					display: "inline-flex",
					alignItems: "center",
					backgroundColor: "var(--dsw-alias-state-business-tertiary, rgba(255, 255, 255, 0.05))",
					borderRadius: "999px",
					padding: "3px",
					border: "1px solid var(--dsw-alias-border-l4, rgba(255, 255, 255, 0.08))",
					marginBottom: "22px"
				},
				children: CATEGORIES.map((cat) => {
					const isSelected = activeCategory === cat.key;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveCategory(cat.key),
						style: {
							display: "inline-flex",
							alignItems: "center",
							gap: "6px",
							padding: "6px 18px",
							borderRadius: "999px",
							border: "none",
							cursor: "pointer",
							fontSize: "13px",
							fontWeight: isSelected ? 600 : 500,
							color: isSelected ? "#FFFFFF" : "var(--dsw-alias-label-caption, #94A3B8)",
							backgroundColor: isSelected ? "var(--dsw-alias-interactive-bg-hover, #1E293B)" : "transparent",
							boxShadow: isSelected ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "none",
							transition: "all 0.18s ease-in-out",
							outline: "none"
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: cat.icon }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: cat.label })]
					}, cat.key);
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "center",
					gap: "10px",
					width: "100%",
					position: "relative",
					paddingRight: "60px",
					boxSizing: "border-box",
					marginBottom: "10px"
				},
				children: [PROMPTS[activeCategory].map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => handleChipClick(item),
					title: item.prompt,
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: "4px",
						padding: "7px 15px",
						borderRadius: "999px",
						border: "1px solid var(--dsw-alias-border-l4, rgba(255, 255, 255, 0.1))",
						backgroundColor: "var(--dsw-alias-state-business-tertiary, rgba(255, 255, 255, 0.04))",
						color: "var(--dsw-alias-label-primary, #E2E8F0)",
						fontSize: "13px",
						fontWeight: 500,
						cursor: "pointer",
						transition: "all 0.16s ease",
						outline: "none"
					},
					onMouseEnter: (e) => {
						e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.12)";
						e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
						e.currentTarget.style.color = "#38BDF8";
						e.currentTarget.style.transform = "translateY(-1px)";
					},
					onMouseLeave: (e) => {
						e.currentTarget.style.backgroundColor = "var(--dsw-alias-state-business-tertiary, rgba(255, 255, 255, 0.04))";
						e.currentTarget.style.borderColor = "var(--dsw-alias-border-l4, rgba(255, 255, 255, 0.1))";
						e.currentTarget.style.color = "var(--dsw-alias-label-primary, #E2E8F0)";
						e.currentTarget.style.transform = "translateY(0)";
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "11px",
							opacity: .7,
							transform: "translate(1px, -1px)"
						},
						children: "↘"
					})]
				}, item.id)), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PeekingMascot, {})]
			})
		]
	});
}
//#endregion
//#region src/client/Brand.tsx
/**
* TPCowork custom brand mark SVG:
* Modern high-tech emblem featuring stylized "TP" geometry with radiant gradient accents.
*/
function TPCoworkBrandMark({ size = 24, className }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-hidden": "true",
		style: {
			display: "inline-block",
			verticalAlign: "middle",
			flexShrink: 0
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: "tpcowork-grad-main",
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22",
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#2563EB"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#1D4ED8"
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: "tpcowork-grad-accent",
				x1: "5",
				y1: "5",
				x2: "19",
				y2: "19",
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#60A5FA"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#3B82F6"
				})]
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
				x: "2",
				y: "2",
				width: "20",
				height: "20",
				rx: "5.5",
				fill: "url(#tpcowork-grad-main)"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M6 7H12.5V8.8H10.1V16.5H8.3V8.8H6V7Z",
				fill: "#FFFFFF"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M12.8 7H16.2C17.65 7 18.7 7.95 18.7 9.4C18.7 10.85 17.65 11.8 16.2 11.8H14.6V16.5H12.8V7ZM14.6 10.3H16C16.8 10.3 17.2 9.9 17.2 9.4C17.2 8.9 16.8 8.5 16 8.5H14.6V10.3Z",
				fill: "#FFFFFF"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
				cx: "17.2",
				cy: "6.2",
				r: "1.3",
				fill: "url(#tpcowork-grad-accent)"
			})
		]
	});
}
/**
* TPCowork sidebar mark occupant for the navigation rail and sidebar header.
*/
function TPCoworkSidebarBrandMark({ size }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TPCoworkBrandMark, { size });
}
/**
* TPCowork hero mark occupant for the conversation empty hero.
* Renders the full WorkBuddy-style Hero section.
*/
function TPCoworkHeroBrandMark(_props) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TPCoworkHeroSection, {});
}
/**
* TPCowork brand name wordmark:
* Clean, modern typography with "TP" in primary ink and "Cowork" in brand electric blue.
*/
function TPCoworkBrandName() {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif",
			fontWeight: 700,
			fontSize: "17px",
			letterSpacing: "-0.025em",
			userSelect: "none",
			lineHeight: "24px"
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			style: { color: "var(--dsw-alias-label-primary, #ffffff)" },
			children: "TP"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			style: {
				background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
				WebkitBackgroundClip: "text",
				WebkitTextFillColor: "transparent",
				marginLeft: "1.5px",
				fontWeight: 600
			},
			children: "Cowork"
		})]
	});
}
//#endregion
//#region src/client/index.ts
/** Required service: the UI slot registry. */
const inject = ["slots"];
/**
* Ensure document.title is always pinned to TPCowork so Windows taskbar preview
* and titlebar reliably present TPCowork branding.
*/
function enforceDocumentTitle() {
	if (typeof document === "undefined") return;
	document.title = "TPCowork";
	const titleEl = document.querySelector("title");
	if (titleEl) {
		titleEl.textContent = "TPCowork";
		new MutationObserver(() => {
			if (document.title !== "TPCowork") document.title = "TPCowork";
		}).observe(titleEl, {
			childList: true,
			characterData: true,
			subtree: true
		});
	}
}
enforceDocumentTitle();
/**
* Register TPCowork brand occupants into sidebar brand slots and conversation hero slot.
* @param ctx - Client root context.
*/
function apply(ctx) {
	enforceDocumentTitle();
	ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.inject("sidebar.brand.name", function* () {
		yield ctx.slots.register({
			name: "sidebar.brand.mark",
			priority: -100
		}, TPCoworkSidebarBrandMark);
		yield ctx.slots.register({
			name: "sidebar.brand.name",
			priority: -100
		}, TPCoworkBrandName);
	}));
	ctx.slots.inject("conversation.hero.brand.mark", function* () {
		yield ctx.slots.register({
			name: "conversation.hero.brand.mark",
			priority: -100
		}, TPCoworkHeroBrandMark);
	});
}
//#endregion
exports.apply = apply;
exports.inject = inject;

return module.exports; } });