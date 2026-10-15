import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/core/components/ui/dialog"
import { Button } from "@/core/components/ui/button"
import type { Todo } from "../types/todo"

interface TodoDeleteModalProps {
    todo: Todo | null
    isOpen: boolean
    onClose: () => void
    onConfirm: (id: string) => void
}

export function TodoDeleteModal({
    todo,
    isOpen,
    onClose,
    onConfirm,
}: TodoDeleteModalProps) {
    if (!todo) return null

    const handleConfirm = () => {
        onConfirm(todo.id)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Xác nhận xóa công việc</DialogTitle>
                    <DialogDescription className="pt-2 text-sm text-muted-foreground">
                        Bạn có chắc chắn muốn xóa công việc:{" "}
                        <span className="font-semibold text-foreground">
                            &ldquo;{todo.title}&rdquo;
                        </span>
                        ? Thao tác này không thể hoàn tác.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleConfirm}
                    >
                        Xác nhận xóa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
