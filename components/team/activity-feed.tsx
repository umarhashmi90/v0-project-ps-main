"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { MessageSquare, CheckCircle, FileText, Users, Clock } from "lucide-react"

interface Activity {
  id: string
  type: "task_created" | "task_completed" | "comment_added" | "file_uploaded" | "member_joined"
  title: string
  description: string
  user: {
    id: string
    full_name: string
    avatar_url?: string
  }
  created_at: string
  metadata?: any
}

interface ActivityFeedProps {
  className?: string
  limit?: number
}

export function ActivityFeed({ className, limit = 10 }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      // In a real app, you would have an activities table
      // For now, we'll simulate activities from tasks and other data
      const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select(`
          id,
          title,
          status,
          created_at,
          updated_at,
          creator:profiles!tasks_creator_id_fkey(id, full_name, avatar_url)
        `)
        .order("updated_at", { ascending: false })
        .limit(limit)

      if (tasksError) throw tasksError

      // Convert tasks to activities
      const taskActivities: Activity[] = (tasks || []).map((task: any) => ({
        id: `task-${task.id}`,
        type: task.status === "completed" ? "task_completed" : "task_created",
        title: task.status === "completed" ? "Task completed" : "Task created",
        description: task.title,
        user: task.creator,
        created_at: task.status === "completed" ? task.updated_at : task.created_at,
        metadata: { taskId: task.id, status: task.status },
      }))

      setActivities(taskActivities)
    } catch (error) {
      console.error("Error fetching activities:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "task_created":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "task_completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "comment_added":
        return <MessageSquare className="h-4 w-4 text-purple-600" />
      case "file_uploaded":
        return <FileText className="h-4 w-4 text-orange-600" />
      case "member_joined":
        return <Users className="h-4 w-4 text-indigo-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No recent activity</div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={activity.user.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{activity.user.full_name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{activity.user.full_name}</span>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(activity.created_at)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{activity.title}:</span> {activity.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
