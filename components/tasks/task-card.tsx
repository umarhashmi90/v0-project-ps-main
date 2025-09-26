"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  category?: string
  due_date?: string
  assignee?: {
    id: string
    full_name: string
    avatar_url?: string
  }
  comments_count?: number
  created_at: string
}

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
  onStatusChange?: (taskId: string, status: Task["status"]) => void
}

const statusColors = {
  todo: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  review: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

const priorityColors = {
  low: "border-l-slate-400",
  medium: "border-l-blue-400",
  high: "border-l-orange-400",
  urgent: "border-l-red-400",
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== "completed"

  return (
    <Card className={cn("border-l-4 hover:shadow-md transition-shadow", priorityColors[task.priority])}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-sm leading-tight">{task.title}</h3>
            {task.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(task)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(task.id)} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn("text-xs", statusColors[task.status])}>
              {task.status.replace("_", " ")}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {task.priority}
            </Badge>
            {task.category && (
              <Badge variant="outline" className="text-xs">
                {task.category}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {task.due_date && (
              <div className={cn("flex items-center gap-1", isOverdue && "text-red-600")}>
                <Calendar className="h-3 w-3" />
                {formatDate(task.due_date)}
              </div>
            )}
            {task.comments_count && task.comments_count > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {task.comments_count}
              </div>
            )}
          </div>

          {task.assignee && (
            <div className="flex items-center gap-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={task.assignee.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">{task.assignee.full_name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {onStatusChange && (
          <div className="flex gap-1 mt-3">
            {(["todo", "in_progress", "review", "completed"] as const).map((status) => (
              <Button
                key={status}
                variant={task.status === status ? "default" : "outline"}
                size="sm"
                className="text-xs h-6 px-2"
                onClick={() => onStatusChange(task.id, status)}
              >
                {status.replace("_", " ")}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
