# Performance Audit: MoonRacle Resume (Next.js 15)
Date: 2026-06-05

## 📊 Summary Results

| Mode | Avg Response Time | RAM Usage | Status |
|------|-------------------|-----------|--------|
| **Dev Mode** (`next dev`) | ~112ms | **764MB** | ⚠️ High Overhead |
| **Production** (Static `out`) | **~13ms** | **~75MB** | ✅ Optimized |

## 🔍 Key Findings

1.  **Dev Mode Overhead:**
    - Next.js 15 development mode introduces significant overhead (~10x slower response, ~10x more RAM).
    - This is expected behavior for Next.js dev mode due to Hot Module Replacement (HMR), on-demand compilation, and telemetry.
    - RAM usage grew from ~516MB (user report) to ~764MB during my benchmark.

2.  **Production Efficiency:**
    - The static export (`output: "export"`) is extremely efficient.
    - Running via a static server (e.g., `serve`) uses minimal resources.

3.  **HMR Bottleneck:**
    - For large static portfolios, HMR can sometimes lag if there are many complex Framer Motion animations or large asset imports.

## 🛠️ Recommendations

1.  **Use Static Preview for Testing:**
    - For UI/Design testing where code changes are not frequent, use the static build:
      ```bash
      npm run build && npx serve out -p 3001
      ```
2.  **Monitor Performance:**
    - A new monitoring script has been added:
      ```bash
      npm run monitor
      ```
3.  **Check for Unused Dependencies:**
    - Ensure large libraries are only imported where needed.

## 📁 Files Created/Modified
- `scripts/perf-monitor.ps1`: Performance monitoring script.
- `package.json`: Added `monitor` script.
- `PERFORMANCE-AUDIT.md`: This report.
