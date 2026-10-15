import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { todoInputSchema, type TodoInput } from "../types/todo"

interface TodoInputFormProps {
    onAdd: (title: string) => void
}

export function TodoInputForm({ onAdd }: TodoInputFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TodoInput>({
        resolver: zodResolver(todoInputSchema),
        defaultValues: {
            title: "",
        },
    })

    const onSubmit = (data: TodoInput) => {
        onAdd(data.title)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-5 w-full">
            <div className="flex items-end gap-3">
                {/* Đường viền chân xám mảnh đúng như mockup */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Add new task"
                        disabled={isSubmitting}
                        {...register("title")}
                        className="w-full border-b border-zinc-300 bg-transparent pb-1.5 pt-1 text-[13.5px] text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-800 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300 transition-colors"
                    />
                </div>

                {/* Nút + bo góc mềm với mã màu #4e4e53 theo yêu cầu */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Add task"
                    className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-xl bg-[#4e4e53] text-white hover:bg-[#3e3e42] active:scale-95 disabled:opacity-50 transition-all"
                >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                </button>
            </div>

            {errors.title && (
                <p className="mt-1.5 text-xs text-destructive">
                    {errors.title.message}
                </p>
            )}
        </form>
    )
}
