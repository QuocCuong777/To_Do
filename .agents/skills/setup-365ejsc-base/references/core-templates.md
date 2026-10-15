# Core Layer Templates

## src/index.css

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/inter";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --text-menu: 1.25rem;
  --text-menu--line-height: 1.5;
  --spacing: 0.4rem;
  --text-xs: 1.2rem;
  --text-sm: 1.3rem;
  --text-base: 1.35rem;
  --text-lg: 1.8rem;
  --text-xl: 2rem;
  --text-2xl: 2.4rem;
  --text-3xl: 3rem;
  --text-4xl: 3.6rem;

  --font-heading: var(--font-sans);
  --font-sans: "Inter Variable", sans-serif;
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-xs: var(--radius);
  --shadow-card:
    0 4px 20px rgb(0 0 0 / 0.08), 0 1px 3px rgb(0 0 0 / 0.04);
  --radius-sm: var(--radius);
  --radius-md: var(--radius);
  --radius-lg: var(--radius);
  --radius-xl: var(--radius);
  --radius-2xl: var(--radius);
  --radius-3xl: var(--radius);
  --radius-4xl: var(--radius);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #ec221f;
  --primary-foreground: #ffffff;
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: #ec221f;
  --chart-1: oklch(0.808 0.114 19.571);
  --chart-2: oklch(0.637 0.237 25.331);
  --chart-3: oklch(0.577 0.245 27.325);
  --chart-4: oklch(0.505 0.213 27.518);
  --chart-5: oklch(0.444 0.177 26.899);
  --radius: 0.63rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.577 0.245 27.325);
  --sidebar-primary-foreground: oklch(0.971 0.013 17.38);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: #ec221f;
  --primary-foreground: #ffffff;
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: #ec221f;
  --chart-1: oklch(0.808 0.114 19.571);
  --chart-2: oklch(0.637 0.237 25.331);
  --chart-3: oklch(0.577 0.245 27.325);
  --chart-4: oklch(0.505 0.213 27.518);
  --chart-5: oklch(0.444 0.177 26.899);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.637 0.237 25.331);
  --sidebar-primary-foreground: oklch(0.971 0.013 17.38);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-size: 1.3rem;
    line-height: 1.5;
  }
  html {
    @apply font-sans;
    font-size: 62.5%;
  }
}
```

## src/core/types/module.ts

```ts
import type { ComponentType } from "react"
import type { LucideIcon } from "lucide-react"

export interface ModulePageProps {
  title: string
}

export interface ModuleRoute {
  path: string
  title: string
  icon: LucideIcon
  navigation?: boolean
  load: () => Promise<{ default: ComponentType<ModulePageProps> }>
}

export interface AppModule {
  id: string
  title: string
  order: number
  icon: LucideIcon
  enabled?: boolean
  navigation?: boolean
  routes: ModuleRoute[]
}
```

## src/core/api/config.ts

```ts
// Cấu hình công khai bắt buộc: tạo .env theo .env.example trước khi chạy.
const configuredUrl = import.meta.env.VITE_DEMO_API_URL?.trim()

if (!configuredUrl) {
  throw new Error("Thiếu VITE_DEMO_API_URL. Hãy cấu hình trong file .env.")
}

const parsedUrl = new URL(configuredUrl)
if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  throw new Error("VITE_DEMO_API_URL phải là URL HTTP hoặc HTTPS.")
}

export const API_BASE_URL = configuredUrl.replace(/\/+$/, "")
```

## src/core/api/client.ts

```ts
import { API_BASE_URL } from "./config"

export class ApiError extends Error {
  readonly status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = "ApiError"
  }
}

/** Shared transport; domain modules validate unknown JSON at their API boundary. */
export async function request(
  path: string,
  options: RequestInit = {}
): Promise<unknown> {
  const timeout = AbortSignal.timeout(15000)
  const headers = new Headers(options.headers)
  headers.set("Accept", "application/json")
  if (options.body) headers.set("Content-Type", "application/json")
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    signal: options.signal
      ? AbortSignal.any([options.signal, timeout])
      : timeout,
  })
  if (!response.ok)
    throw new ApiError(
      response.status,
      `Yêu cầu thất bại (HTTP ${response.status}).`
    )
  return response.status === 204 ? undefined : response.json()
}
```

## src/core/providers/theme-provider.tsx

ThemeProvider hỗ trợ dark/light/system, localStorage sync, phím D toggle, cross-tab sync, disable transition on change. Xem file gốc tại `src/core/providers/theme-provider.tsx` để sao chép toàn bộ (~230 dòng).

## src/core/components/ui/

Các UI primitives (Button, Dialog, Input, Textarea, Command, Kbd, Separator, Sonner) đều dùng `@base-ui/react` + `cva` + `cn`. Được cài qua `pnpm dlx shadcn@latest add <component>` với style `base-nova`.

## src/core/components/ (Shell components)

- **app-image.tsx**: Image wrapper với lazy loading, fill, priority
- **app-states.tsx**: `EmptyModules` + `NotFound` components
- **command-search.tsx**: Command palette (⌘K) dùng cmdk
- **header-navigation.tsx**: `ModuleNavigation` (tab phân hệ) + `HeaderNavigation` (tab chức năng)
- **page-loading.tsx**: Spinner loading cho Suspense
- **router-link.tsx**: Link wrapper (internal → RouterLink, external → `<a>`)
- **site-header.tsx**: Header chính: logo, module nav, search trigger, ResizeObserver cho `--app-header-height`
