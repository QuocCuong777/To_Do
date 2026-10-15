# Shell/Router Layer Templates

## src/main.tsx

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/core/providers/theme-provider.tsx"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "@/core/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="edu-ui-theme">
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
```

## src/App.tsx

```tsx
import { AppRouter } from "@/router"
export function App() {
  return <AppRouter />
}
export default App
```

## src/router/registry.ts

```ts
import { matchPath } from "react-router-dom"
import type { AppModule } from "@/core/types/module"

// Vite discovers only modules that exist. No imports of specific modules in the shell.
const discovered = import.meta.glob<AppModule>("../modules/*/module.ts", {
  eager: true,
  import: "default",
})

export const availableModules = Object.values(discovered)
  .filter((module) => module.enabled !== false)
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))

const ids = new Set<string>()
const paths = new Set<string>()
for (const module of availableModules) {
  if (ids.has(module.id)) throw new Error(`Duplicate module ID: ${module.id}`)
  ids.add(module.id)
  for (const route of module.routes) {
    if (
      !route.path.startsWith("/") ||
      route.path === "/" ||
      route.path === "*"
    ) {
      throw new Error(`Invalid module route: ${route.path}`)
    }
    if (paths.has(route.path)) throw new Error(`Duplicate route: ${route.path}`)
    paths.add(route.path)
  }
}

export const modules = availableModules
  .filter((module) => module.navigation !== false)
  .map((module) => ({
    ...module,
    items: module.routes
      .filter((route) => route.navigation !== false)
      .map((route) => ({
        title: route.title,
        href: route.path,
        icon: route.icon,
      })),
  }))
  .filter((module) => module.items.length > 0)

export const defaultPath = modules[0]?.items[0]?.href ?? null
export const searchItems = modules.flatMap((module) =>
  module.items.map((item) => ({
    title: item.title,
    url: item.href,
    group: module.title,
    icon: item.icon,
  }))
)

export function getNavigation(pathname: string) {
  return modules
    .flatMap((module) => module.items.map((item) => ({ module, item })))
    .filter(({ item }) => matchPath({ path: item.href, end: false }, pathname))
    .sort((a, b) => b.item.href.length - a.item.href.length)[0]
}
```

## src/router/index.tsx

```tsx
import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { SiteHeader } from "@/core/components/site-header"
import { EmptyModules, NotFound } from "@/core/components/app-states"
import { PageLoading } from "@/core/components/page-loading"
import { availableModules, defaultPath } from "./registry"

const routes = availableModules.flatMap((module) =>
  module.routes.map((route) => ({ ...route, Page: lazy(route.load) }))
)

function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

/** Public shell: each module registers its own lazy routes. */
export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            defaultPath ? (
              <Navigate to={defaultPath} replace />
            ) : (
              <EmptyModules />
            )
          }
        />
        {routes.map(({ path, title, Page }) => (
          <Route key={path} path={path} element={<Page title={title} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```

## src/router/hooks.ts

```ts
import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function usePathname() {
  return useLocation().pathname
}

export function useRouter() {
  const navigate = useNavigate()
  return useMemo(
    () => ({
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      back: () => navigate(-1),
    }),
    [navigate]
  )
}
```
