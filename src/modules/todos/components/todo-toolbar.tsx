import { Search } from "lucide-react"
import type { FilterStatus } from "../types/todo"

interface TodoToolbarProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    filterStatus: FilterStatus
    onFilterChange: (status: FilterStatus) => void
}

const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
    { label: "Tất cả", value: "all" },
    { label: "Chưa xong", value: "active" },
    { label: "Đã xong", value: "completed" },
]

export function TodoToolbar({
    searchQuery,
    onSearchChange,
    filterStatus,
    onFilterChange,
}: TodoToolbarProps) {
    return (
        <div className="mb-3.5 flex items-center justify-between gap-3 text-xs">
            {/* Ô tìm kiếm dạng gạch chân siêu mảnh */}
            <div className="relative flex-1 max-w-[200px]">
                <Search className="absolute left-1 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full bg-transparent pl-6 pr-2 py-1 text-xs text-foreground placeholder:text-zinc-400 border-b border-zinc-200 focus:border-zinc-500 focus:outline-none transition-colors"
                />
            </div>

            {/* Các tab lọc tinh tế */}
            <div className="flex items-center gap-1">
                {FILTER_OPTIONS.map((tab) => {
                    const isActive = filterStatus === tab.value
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => onFilterChange(tab.value)}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${isActive
                                    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
                                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
