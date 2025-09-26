"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Users, MoreHorizontal, CheckSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description?: string
  status: "active" | "completed" | "archived"
  priority: "low" | "medium" | "high"
  start_date?: string
  due_date?: string
  owner: {
    id: string
    full_name: string
    avatar_url?: string
  }
  members_count?: number
  tasks_count?: number
  completed_tasks_count?: number
  created_at: string
}

interface ProjectCardProps {
  project: Project
  onEdit?: (project: Project) => void
  onDelete?: (projectId: string) => void
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  archived: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
}

const priorityColors = {
  low: "border-l-slate-400",
  medium: "border-l-blue-400",
  high: "border-l-orange-400",
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const completionPercentage = project.tasks_count
    ? Math.round(((project.completed_tasks_count || 0) / project.tasks_count) * 100)
    : 0

  const isOverdue = project.due_date && new Date(project.due_date) < new Date() && project.status !== "completed"

  return (
    <Card className={cn("border-l-4 hover:shadow-md transition-shadow", priorityColors[project.priority])}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/dashboard/projects/${project.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">{project.name}</h3>
            </Link>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(project)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(project.id)} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn("text-xs", statusColors[project.status])}>
              {project.status}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {project.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.owner.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">{project.owner.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{project.owner.full_name}</span>
          </div>
        </div>

        {/* Progress */}
        {project.tasks_count && project.tasks_count > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4" />
              <span>
                {project.completed_tasks_count || 0}/{project.tasks_count || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{project.members_count || 0}</span>
            </div>
          </div>

          {project.due_date && (
            <div className={cn("flex items-center gap-1", isOverdue && "text-red-600")}>
              <Calendar className="h-4 w-4" />
              <span>{formatDate(project.due_date)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
