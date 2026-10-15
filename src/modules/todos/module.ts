import { CheckSquare } from "lucide-react"
import type { AppModule } from "@/core/types/module"

const todosModule: AppModule = {
  id: "todos",
  title: "Danh sách công việc",
  order: 1,
  icon: CheckSquare,
  routes: [
    {
      path: "/todos",
      title: "Your To Do",
      icon: CheckSquare,
      load: () => import("./pages/todos-page"),
    },
  ],
}

export default todosModule
