import { useState } from "react"
import { useTodos } from "../hooks/use-todos"
import { usePagination } from "../hooks/use-pagination"
import { TodoInputForm } from "../components/todo-input-form"
import { TodoList } from "../components/todo-list"
import { TodoPagination } from "../components/todo-pagination"
import { TodoFooter } from "../components/todo-footer"
import { TodoEditModal } from "../components/todo-edit-modal"
import { TodoDeleteModal } from "../components/todo-delete-modal"
import type { Todo } from "../types/todo"

export default function TodosPage() {
    // 1. Lấy dữ liệu và các hàm thao tác từ hook useTodos
    const {
        todos,
        filteredTodos,
        remainingCount,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
    } = useTodos()

    // 2. Tách dữ liệu phân trang (5 task / trang) từ hook usePagination
    const {
        currentPage,
        totalPages,
        paginatedItems,
        hasNextPage,
        hasPrevPage,
        goToPage,
    } = usePagination({
        items: filteredTodos,
        pageSize: 5,
    })

    // 3. State quản lý Modal Chỉnh sửa
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const handleOpenEdit = (todo: Todo) => {
        setEditingTodo(todo)
        setIsEditOpen(true)
    }

    const handleCloseEdit = () => {
        setEditingTodo(null)
        setIsEditOpen(false)
    }

    // 4. State quản lý Modal Xác nhận Xóa
    const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const handleOpenDelete = (id: string) => {
        const target = todos.find((t) => t.id === id) || null
        setDeletingTodo(target)
        setIsDeleteOpen(true)
    }

    const handleCloseDelete = () => {
        setDeletingTodo(null)
        setIsDeleteOpen(false)
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#eaedf0] p-4 sm:p-8 md:p-12 dark:bg-zinc-950 transition-colors">
            {/* 1. KHUNG GỐC TO (Khung bảng trắng lớn bo góc tròn mềm như mockup Desktop bên trái) */}
            <div className="flex w-full max-w-[860px] min-h-[580px] items-center justify-center rounded-[32px] border border-zinc-200/60 bg-white p-6 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:border-zinc-800 dark:bg-zinc-900 transition-all">

                {/* 2. FORM TO-DO NHỎ GỌN (Chiều rộng cố định ~350px đặt ngay chính giữa khung gốc) */}
                <main className="w-full max-w-[350px]">
                    {/* Tiêu đề "Your To Do" */}
                    <h1 className="mb-5 text-[22px] font-bold tracking-tight text-zinc-900 dark:text-white">
                        Your To Do
                    </h1>

                    {/* Form nhập task mới */}
                    <TodoInputForm onAdd={addTodo} />

                    {/* Danh sách các task */}
                    <TodoList
                        todos={paginatedItems}
                        onToggle={toggleTodo}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                    />

                    {/* Bộ phân trang (tự ẩn nếu <= 5 task) */}
                    <TodoPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                    />

                    {/* Chân trang đếm task + quote */}
                    <TodoFooter remainingCount={remainingCount} />
                </main>
            </div>

            {/* Modal Sửa & Xóa */}
            <TodoEditModal
                todo={editingTodo}
                isOpen={isEditOpen}
                onClose={handleCloseEdit}
                onSave={updateTodo}
            />

            <TodoDeleteModal
                todo={deletingTodo}
                isOpen={isDeleteOpen}
                onClose={handleCloseDelete}
                onConfirm={deleteTodo}
            />
        </div>
    )

}
