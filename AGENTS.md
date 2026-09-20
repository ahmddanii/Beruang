# Agent & Vibe Coding Guidelines

## Mandatory Skills & Principles
AI Agent **WAJIB SELALU** menerapkan prinsip dari 4 skill utama ini pada setiap respons dan modifikasi:
1. **`ponytail`**: Selalu pilih solusi paling ringkas, efisien, dan minimal (YAGNI). Gunakan native platform dan stdlib sebelum dependencies, reusable code yang sudah ada sebelum membuat baru.
2. **`ai-anti-slop`**: Dilarang membuat antarmuka generik atau template AI murahan. Setiap UI harus memiliki *creative thesis*, intensional, dan berkarakter kuat sesuai DNA proyek.
3. **`better-ui`**: Eksekusi detail visual tingkat tinggi — transisi halus, micro-interactions, states lengkap (hover/active/focus/empty/loading), dan motion restraint.
4. **`taste skills` (`design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`)**: Standar estetika agensi premium, kontras tipografi berkelas, bento grid taktis, dan sentuhan visual mahal.

## Structure
- `.agents/skills/` - Active execution skills (`ponytail`, `ai-anti-slop`, `better-ui`, `design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`, `better-typography`, `council`, `ui-ux-pro-max`, `frontend-design`, dll).
- `.agents/rules/` - Design & code rules ([DESIGN.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/DESIGN.md), [DESIGN-apple.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/DESIGN-apple.md), [PWA-DESIGN-RULES.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/PWA-DESIGN-RULES.md), [AGENT.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/AGENT.md)).
- `docs/` - Product specs ([PRD.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/PRD.md)), architecture ([ARCHITECTURE.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/ARCHITECTURE.md)), and developer guidelines ([guidelines/](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/guidelines)).
- `public/` - Brand assets ([logo.svg](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/public/logo.svg), [fonts/Satoshi-Variable.ttf](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/public/fonts/Satoshi-Variable.ttf)).

## Vibe Coding Rules
1. **Design First**: Strict adherence to [docs/DESIGN.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/DESIGN.md) & [.agents/rules/DESIGN.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/DESIGN.md) (High-Contrast Minimalist Bento Grid: Canvas `#F5F6FB`, Dark Hero `#111318`, Primary Blue `#0066FF`, Gold Badge `#FED440` with `#1A1A1A` text).
2. **Minimal Diff**: Write minimal working code. Stdlib and native platform over heavy dependencies.
3. **Typography & Brand**: Headings/Metrics in `Bricolage Grotesque`, Body/Controls in `Poppins`. Mandatory `tabular-nums` on all currency & metrics.
4. **Fast Iteration**: Build working prototype first, refine interactively.
