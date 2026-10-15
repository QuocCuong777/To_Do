# To-Do Application

Dự án phát triển theo kiến trúc **3 lớp (Shell → Core → Modules)** của chuẩn 365ejsc.edu.base:
- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 + Base UI (Shadcn UI base-nova)
- Kiến trúc module động (`src/modules/*`)

## Khởi chạy dự án

```sh
pnpm install
pnpm dev
```

## Kiểm tra chuẩn dự án

```sh
pnpm build
pnpm lint
pnpm check:modules
pnpm check:without-modules
```

Xem [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) và skill trong `.agents/skills/setup-365ejsc-base` để biết chi tiết quy ước kiến trúc và cách thêm module mới.

