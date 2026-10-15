import { ChevronLeft, ChevronRight } from "lucide-react"

interface TodoPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    hasNextPage: boolean
    hasPrevPage: boolean
}

export function TodoPagination({
    currentPage,
    totalPages,
    onPageChange,
    hasNextPage,
    hasPrevPage,
}: TodoPaginationProps) {
    // Nếu chỉ có 1 trang (<= 5 task), ẩn thanh phân trang để giữ giao diện tối giản y như mockup
    if (totalPages <= 1) return null

    return (
        <div className="mt-4 flex items-center justify-center gap-2 pt-2">
            <button
                type="button"
                aria-label="Previous page"
                disabled={!hasPrevPage}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Danh sách các số trang 1, 2, 3... */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all ${currentPage === page
                                ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                aria-label="Next page"
                disabled={!hasNextPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    )
}
