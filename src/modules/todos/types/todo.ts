import { z } from "zod"

export const todoSchema = z.object({
    id: z.string().min(1, "ID không được để trống"),
    title: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập nội dung công việc")
        .min(2, "Nội dung công việc phải có ít nhất 2 ký tự")
        .max(100, "Nội dung công việc không được vượt quá 100 ký tự"),
    completed: z.boolean().default(false),
    createdAt: z.string(),
})

export const todoInputSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập nội dung công việc")
        .min(2, "Nội dung công việc phải có ít nhất 2 ký tự")
        .max(100, "Nội dung công việc không được vượt quá 100 ký tự"),
})

export type FilterStatus = "all" | "active" | "completed"

export type Todo = z.infer<typeof todoSchema>
export type TodoInput = z.infer<typeof todoInputSchema>