---
name: setup-365ejsc-base
description: >-
  Sử dụng skill này khi người dùng yêu cầu tạo mới, setup, scaffold hoặc triển khai
  một dự án React theo cấu trúc 365ejsc.edu.base. Skill chứa toàn bộ kiến trúc,
  cấu hình, quy ước đặt tên, template code và quy trình từng bước để khởi tạo dự án mới.
  Kích hoạt khi nghe các từ khóa: "setup 365", "tạo dự án 365", "scaffold edu base",
  "cấu trúc 365ejsc", "setup cấu trúc edu", "triển khai dự án mới theo 365".
---

# Setup dự án theo cấu trúc 365ejsc.edu.base

## Tổng quan

Dự án sử dụng kiến trúc **3 lớp (Shell → Core → Modules)** với stack:
- **React 19** + **TypeScript 6 strict** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite` plugin)
- **Shadcn UI base-nova** (`@base-ui/react`)
- **Zod 4** (runtime schema validation)
- **React Router DOM v7**
- **Sonner** (toast), **Lucide React** (icons), **CVA** (variants)
- **Inter Variable** font
- **pnpm** package manager

---

## Quy trình Setup từng bước

### Bước 1: Khởi tạo Vite project

```bash
pnpm create vite@latest ./ -- --template react-ts
```

### Bước 2: Cài đặt dependencies

```bash
# Production dependencies
pnpm add @base-ui/react @fontsource-variable/inter @tailwindcss/vite tailwindcss class-variance-authority cmdk cn lucide-react react-router-dom shadcn sonner tw-animate-css zod

# Dev dependencies
pnpm add -D @eslint/js @playwright/test @types/node @types/react @types/react-dom @vitejs/plugin-react eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals prettier prettier-plugin-tailwindcss typescript typescript-eslint vite
```

### Bước 3: Tạo cấu trúc thư mục

```text
src/
├── main.tsx
├── App.tsx
├── index.css
├── assets/logos/
├── core/
│   ├── api/
│   │   ├── config.ts
│   │   └── client.ts
│   ├── components/
│   │   ├── app-image.tsx
│   │   ├── app-states.tsx
│   │   ├── command-search.tsx
│   │   ├── header-navigation.tsx
│   │   ├── page-loading.tsx
│   │   ├── router-link.tsx
│   │   ├── site-header.tsx
│   │   └── ui/ (button, dialog, input, textarea, command, kbd, separator, sonner)
│   ├── providers/
│   │   └── theme-provider.tsx
│   └── types/
│       └── module.ts
├── router/
│   ├── registry.ts
│   ├── index.tsx
│   └── hooks.ts
└── modules/
    └── (empty - ready for modules)
scripts/
├── check-module-boundaries.mjs
└── check-without-modules.mjs
tests/
public/
docs/
```

### Bước 4: Cấu hình files gốc

Tham khảo chi tiết trong [references/configs.md](./references/configs.md).

### Bước 5: Tạo Core layer

Tham khảo chi tiết trong [references/core-templates.md](./references/core-templates.md).

### Bước 6: Tạo Router/Shell layer

Tham khảo chi tiết trong [references/shell-templates.md](./references/shell-templates.md).

### Bước 7: Shadcn UI init

```bash
pnpm dlx shadcn@latest init
```
Chọn: style `base-nova`, css `src/index.css`, baseColor `neutral`, cssVariables `true`.
Cấu hình aliases trong `components.json`:
```json
{
  "aliases": {
    "components": "@/core/components",
    "utils": "@/core/lib/utils",
    "ui": "@/core/components/ui",
    "lib": "@/core/lib",
    "hooks": "@/core/hooks"
  }
}
```

### Bước 8: Thêm module đầu tiên

Tham khảo chi tiết trong [references/module-template.md](./references/module-template.md).

### Bước 9: Verify

```bash
pnpm build
pnpm lint
pnpm check:modules
pnpm dev
```

---

## Quy ước quan trọng

### Naming conventions
| Đối tượng | Quy tắc | Ví dụ |
|---|---|---|
| Thư mục | `kebab-case`, số nhiều | `components`, `hooks` |
| File | `kebab-case` | `todo-form.tsx` |
| Page file | `-page.tsx` suffix | `todos-page.tsx` |
| Component | `PascalCase` | `TodoForm` |
| Hook | `use` prefix | `useTodos` |
| API function | verb + noun | `listTodos` |
| Callback prop | `on` + action | `onEdit` |
| Handler | `handle` + action | `handleSubmit` |

### Export rules
- **Named export**: Components, hooks, API, utilities
- **Default export**: Pages (cho lazy loader) và `module.ts` (cho registry)

### Import boundaries
- Core ❌→ Module (trừ `import.meta.glob`)
- Module A ❌→ Module B
- Module → Core: ✅ via `@/core/...`
- Module internal: ✅ via relative `../`

### Module structure template
```
modules/<id>/
├── module.ts         # AppModule, default export
├── types/            # Zod schemas + TS types
├── api/              # HTTP functions
├── hooks/            # State management
├── utils/            # Pure functions
├── components/       # UI components
└── pages/            # Route entries, default export
```

Chi tiết đầy đủ → xem thư mục `references/`.
