interface TodoFooterProps {
    remainingCount: number
}

export function TodoFooter({ remainingCount }: TodoFooterProps) {
    return (
        <footer className="mt-5 space-y-1 pt-1 select-none">
            {/* Dòng đếm số task còn lại */}
            <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                Your remaining todos : <span className="font-bold">{remainingCount}</span>
            </p>

            {/* Câu Quote chữ nghiêng mờ */}
            <p className="text-[11.5px] italic text-zinc-400 dark:text-zinc-500 font-normal leading-relaxed">
                &ldquo;Doing what you love is the cornerstone of having abundance in your life.&rdquo; &ndash; Wayne Dyer
            </p>
        </footer>
    )
}
