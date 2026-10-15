# Module Template — Cách thêm module mới

## Bước 1: Khai báo module (`modules/<id>/module.ts`)

```ts
import { <ModuleIcon>, <RouteIcon> } from "lucide-react"
import type { AppModule } from "@/core/types/module"

const <id>Module: AppModule = {
  id: "<module-id>",        // Unique, stable technical ID
  title: "<Tên hiển thị>",  // Display label
  order: <number>,           // Sort order
  icon: <ModuleIcon>,        // Module icon (Lucide)
  routes: [
    {
      path: "/<module-id>/<page>",   // Route, starts with /
      title: "<Tên trang>",
      icon: <RouteIcon>,
      load: () => import("./pages/<page-name>-page"),
    },
    // Thêm routes khác nếu cần
  ],
}

export default <id>Module
```

## Bước 2: Schema + Types (`modules/<id>/types/<entity>.ts`)

```ts
import { z } from "zod"

// Runtime validation and static types share one source of truth.
export const <entity>Schema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  // ... fields
})

export type <Entity> = z.infer<typeof <entity>Schema>
export type <Entity>Input = Pick<<Entity>, "field1" | "field2">
```

## Bước 3: API layer (`modules/<id>/api/<entity>-api.ts`)

```ts
import { z } from "zod"
import { request } from "@/core/api/client"
import { <entity>Schema, type <Entity>, type <Entity>Input } from "../types/<entity>"

export async function list<Entities>(signal?: AbortSignal): Promise<<Entity>[]> {
  return z.array(<entity>Schema).parse(await request("/<entities>", { signal }))
}

export async function create<Entity>(input: <Entity>Input): Promise<<Entity>> {
  return <entity>Schema.parse(
    await request("/<entities>", {
      method: "POST",
      body: JSON.stringify({ ...input, createdAt: new Date().toISOString() }),
    })
  )
}

export async function update<Entity>(id: string, input: <Entity>Input): Promise<<Entity>> {
  return <entity>Schema.parse(
    await request(`/<entities>/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(input),
    })
  )
}

export async function delete<Entity>(id: string): Promise<void> {
  await request(`/<entities>/${encodeURIComponent(id)}`, { method: "DELETE" })
}
```

## Bước 4: Hook (`modules/<id>/hooks/use-<entities>.ts`)

```ts
import { useCallback, useEffect, useRef, useState } from "react"
import { create<Entity>, delete<Entity>, list<Entities>, update<Entity> } from "../api/<entity>-api"
import type { <Entity>, <Entity>Input } from "../types/<entity>"

export function use<Entities>() {
  const [items, setItems] = useState<<Entity>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const mutationPending = useRef(false)
  const loadController = useRef<AbortController | null>(null)

  const load = useCallback(
    (controller: AbortController) =>
      list<Entities>(controller.signal)
        .then((data) => {
          if (!controller.signal.aborted) setItems(data)
        })
        .catch((cause: unknown) => {
          if (!controller.signal.aborted)
            setError(
              cause instanceof Error ? cause.message : "Không tải được danh sách."
            )
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false)
        }),
    []
  )

  const reload = useCallback(() => {
    loadController.current?.abort()
    const controller = new AbortController()
    loadController.current = controller
    setLoading(true)
    setError(null)
    return load(controller)
  }, [load])

  useEffect(() => {
    const controller = new AbortController()
    loadController.current = controller
    void load(controller)
    return () => loadController.current?.abort()
  }, [load])

  const mutate = useCallback(async (operation: () => Promise<void>) => {
    if (mutationPending.current) throw new Error("Một thao tác đang được xử lý.")
    mutationPending.current = true
    loadController.current?.abort()
    setLoading(false)
    setSaving(true)
    try {
      await operation()
    } finally {
      mutationPending.current = false
      setSaving(false)
    }
  }, [])

  const save = (input: <Entity>Input, id?: string) =>
    mutate(async () => {
      const item = id ? await update<Entity>(id, input) : await create<Entity>(input)
      setItems((current) =>
        id
          ? current.map((i) => (i.id === id ? item : i))
          : [item, ...current]
      )
    })

  const remove = (id: string) =>
    mutate(async () => {
      await delete<Entity>(id)
      setItems((current) => current.filter((i) => i.id !== id))
    })

  return { items, loading, error, saving, reload, save, remove }
}
```

## Bước 5: Components (`modules/<id>/components/`)

- **Form component**: Controlled form, local state, validation, `onSubmit(input)`, `onCancel()`
- **Table component**: Data table, callbacks `onView`, `onEdit`, `onDelete`

## Bước 6: Page (`modules/<id>/pages/<page-name>-page.tsx`)

```tsx
import type { ModulePageProps } from "@/core/types/module"

export default function <PageName>Page({ title }: ModulePageProps) {
  // hook + search + pagination + dialogs
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {/* Content */}
    </section>
  )
}
```

## Quy tắc

- Page dùng **default export**
- Components, hooks, API dùng **named export**
- Import Core bằng `@/core/...`
- Import nội bộ module bằng `../`
- Không import code từ module khác
- Chỉ tạo thư mục khi có file tương ứng
- Pagination client-side: `PAGE_SIZE = 10`, `Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))`
