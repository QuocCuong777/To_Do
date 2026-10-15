import type { Todo } from "../types/todo"
import { TodoItem } from "./todo-item"
import { ClipboardList } from "lucide-react"

interface TodoListProps {
    todos: Todo[]
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (todo: Todo) => void
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
    // Trạng thái khi không có công việc nào (Empty State)
    if (todos.length === 0) {
        return (
            <div className="my-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <ClipboardList className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">
                    Không có công việc nào
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                    Hãy thêm công việc mới hoặc thử tìm kiếm từ khóa khác.
                </p>
            </div>
        )
    }

    // Danh sách các thẻ công việc xếp dọc nhau theo đúng khoảng cách trong ảnh
    return (
        <div className="flex flex-col gap-2.5">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    )
}
