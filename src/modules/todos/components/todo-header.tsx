interface TodoHeaderProps {
    title?: string
}

export function TodoHeader({ title = "Your To Do" }: TodoHeaderProps) {
    return (
        <header className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
            </h1>
        </header>
    )
}