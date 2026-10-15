import { Check, X, Pencil } from "lucide-react"
import type { Todo } from "../types/todo"

interface TodoItemProps {
    todo: Todo
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (todo: Todo) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
    return (
        <div
            className={`group flex items-center justify-between gap-3.5 rounded-xl border px-4 py-3 transition-all duration-150 ${todo.completed
                    ? "border-zinc-300/80 bg-zinc-50/30 dark:border-zinc-800 dark:bg-zinc-900/20"
                    : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
                }`}
        >
            {/* Vùng bấm: Checkbox và Tiêu đề */}
            <div
                onClick={() => onToggle(todo.id)}
                className="flex flex-1 items-center gap-3.5 cursor-pointer select-none min-w-0"
            >
                {/* Checkbox: Nền #4e4e53 tick trắng khi hoàn thành, viền xám rỗng khi chưa */}
                <button
                    type="button"
                    role="checkbox"
                    aria-checked={todo.completed}
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggle(todo.id)
                    }}
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] transition-all ${todo.completed
                            ? "bg-[#4e4e53] text-white"
                            : "border-[1.5px] border-zinc-400/80 hover:border-zinc-600 dark:border-zinc-500"
                        }`}
                >
                    {todo.completed && (
                        <Check className="h-3 w-3 stroke-[3]" />
                    )}
                </button>

                {/* Tiêu đề công việc trên 1 dòng duy nhất */}
                <span
                    className={`truncate text-[13.5px] tracking-tight transition-colors ${todo.completed
                            ? "line-through text-zinc-400 dark:text-zinc-500"
                            : "text-zinc-800 font-medium dark:text-zinc-200"
                        }`}
                >
                    {todo.title}
                </span>
            </div>

            {/* Vùng hành động bên phải: Nút sửa chỉ hiện khi hover, nút × luôn hiển thị theo mockup */}
            <div className="flex items-center gap-1 shrink-0">
                <button
                    type="button"
                    aria-label="Edit task"
                    onClick={() => onEdit(todo)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-700 p-1 rounded transition-all dark:hover:text-zinc-200"
                    title="Chỉnh sửa"
                >
                    <Pencil className="h-3.5 w-3.5" />
                </button>

                <button
                    type="button"
                    aria-label="Delete task"
                    onClick={() => onDelete(todo.id)}
                    className="flex h-6 w-6 items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                    <X className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
            </div>
        </div>
    )
}
