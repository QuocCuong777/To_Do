import { useState, useEffect, useMemo, useCallback } from "react"
import type { Todo, FilterStatus } from "../types/todo"

const STORAGE_KEY = "todo_app_data"

export const INITIAL_TODOS: Todo[] = [
    {
        id: "1",
        title: "Learn React",
        completed: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Build a To-Do List",
        completed: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        title: "Practice JavaScript",
        completed: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: "4",
        title: "Read a book",
        completed: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: "5",
        title: "Go for a walk",
        completed: false,
        createdAt: new Date().toISOString(),
    },
]

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                return JSON.parse(saved) as Todo[]
            }
        } catch (error) {
            console.error("Lỗi đọc dữ liệu từ localStorage", error)
        }
        return INITIAL_TODOS
    })

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
        } catch (error) {
            console.error("Lỗi lưu dữ liệu vào localStorage", error)
        }
    }, [todos])

    // Thêm công việc
    const addTodo = useCallback((title: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        }
        setTodos((prev) => [newTodo, ...prev])
    }, [])

    // Đảo trạng thái hoàn thành / chưa hoàn thành
    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        )
    }, [])

    // 3. Cập nhật tiêu đề sau khi sửa qua Modal
    const updateTodo = useCallback((id: string, newTitle: string) => {
        setTodos((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, title: newTitle.trim() } : item
            )
        )
    }, [])

    // 4. Xóa công việc
    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((item) => item.id !== id))
    }, [])

    // Đếm số việc chưa hoàn thành
    const remainingCount = useMemo(() => {
        return todos.filter((item) => !item.completed).length
    }, [todos])

    // Danh sách đã lọc theo Tab và Từ khóa tìm kiếm
    const filteredTodos = useMemo(() => {
        return todos.filter((item) => {
            if (filterStatus === "active" && item.completed) return false
            if (filterStatus === "completed" && !item.completed) return false

            if (searchQuery.trim()) {
                return item.title
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
            }
            return true
        })
    }, [todos, searchQuery, filterStatus])

    return {
        todos,
        filteredTodos,
        remainingCount,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
    }
} 
