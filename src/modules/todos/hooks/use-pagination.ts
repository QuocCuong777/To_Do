import { useState, useMemo, useEffect, useCallback } from "react"

interface UsePaginationOptions<T> {
    items: T[]
    pageSize?: number
    initialPage?: number
}

export function usePagination<T>({
    items,
    pageSize = 5,
    initialPage = 1,
}: UsePaginationOptions<T>) {
    // 1. State lưu trang hiện tại
    const [currentPage, setCurrentPage] = useState<number>(initialPage)
    // 2. Tính toán tổng số trang (tối thiểu là 1 trang)
    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(items.length / pageSize))
    }, [items.length, pageSize])
    // 3. Xử lý trường hợp danh sách bị co lại (khi tìm kiếm hoặc xóa bớt task)
    // Nếu trang hiện tại lớn hơn tổng số trang, tự động lùi về trang cuối hợp lệ
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])
    // 4. Cắt mảng dữ liệu để lấy danh sách hiển thị cho trang hiện tại
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        const endIndex = startIndex + pageSize
        return items.slice(startIndex, endIndex)
    }, [items, currentPage, pageSize])
    // 5. Các hàm điều hướng trang
    const goToPage = useCallback(
        (page: number) => {
            const validPage = Math.max(1, Math.min(page, totalPages))
            setCurrentPage(validPage)
        },
        [totalPages]
    )
    const nextPage = useCallback(() => {
        goToPage(currentPage + 1)
    }, [currentPage, goToPage])
    const prevPage = useCallback(() => {
        goToPage(currentPage - 1)
    }, [currentPage, goToPage])
    // 6. Trả về toàn bộ dữ liệu và hàm điều khiển
    return {
        currentPage,
        totalPages,
        paginatedItems,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        totalItems: items.length,
        goToPage,
        nextPage,
        prevPage,
    }
}