# LiquidFill Chart (Vue 3)
A Canvas-based liquid fill gauge built with Vue 3 + TypeScript.
The water level animates smoothly and changes color dynamically based on percentage.

- Pure Canvas animation (no SVG dependency)
- Smooth dual-wave animation
- Dynamic color by percentage
    0–50% → Green (Normal)
    50–75% → Blue (Warning)
    75–100% → Red (Critical)
- Responsive (auto resize)

📦 Demo

https://chen0303.github.io/Liquid-Fill-Chart/

📦 Requirements
Make sure you have the following installed:
1. [Node.js](https://nodejs.org/zh-tw/download)

2. Either npm, pnpm, or yarn

🧩 How to Use the Gauge Component
```ts
import { createWaterBall } from "@/composables/useWaterBall";

createWaterBall(canvas, value)
```

📦 Build for Production

```ts
npm run dev
```
