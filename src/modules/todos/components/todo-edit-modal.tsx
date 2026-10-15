import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/core/components/ui/dialog"
import { Button } from "@/core/components/ui/button"
import { todoInputSchema, type Todo, type TodoInput } from "../types/todo"

interface TodoEditModalProps {
    todo: Todo | null
    isOpen: boolean
    onClose: () => void
    onSave: (id: string, newTitle: string) => void
}

export function TodoEditModal({
    todo,
    isOpen,
    onClose,
    onSave,
}: TodoEditModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TodoInput>({
        resolver: zodResolver(todoInputSchema),
        defaultValues: {
            title: "",
        },
    })

    // Điền sẵn tiêu đề cũ của task vào ô input mỗi khi mở modal
    useEffect(() => {
        if (todo) {
            reset({ title: todo.title })
        }
    }, [todo, reset])

    const onSubmit = (data: TodoInput) => {
        if (!todo) return
        onSave(todo.id, data.title)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa công việc</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1.5">
                        <input
                            type="text"
                            placeholder="Nhập tiêu đề mới..."
                            {...register("title")}
                            className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
                        />
                        {errors.title && (
                            <p className="text-xs text-destructive">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button type="submit">
                            Lưu thay đổi
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
