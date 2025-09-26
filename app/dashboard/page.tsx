import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Plus, TrendingUp, Users, CheckSquare, FolderOpen, Clock } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch real data from database
  const [{ data: projects }, { data: tasks }, { data: teamMembers }, { data: recentActivity }] = await Promise.all([
    supabase.from("projects").select("*").order("updated_at", { ascending: false }),
    supabase.from("tasks").select("*").order("updated_at", { ascending: false }),
    supabase.from("project_members").select("*, profiles(*)").limit(10),
    supabase.from("activity_log").select("*, profiles(*)").order("created_at", { ascending: false }).limit(5),
  ])

  // Calculate stats from real data
  const stats = {
    totalProjects: projects?.length || 0,
    activeTasks: tasks?.filter((task) => task.status !== "completed").length || 0,
    teamMembers: teamMembers?.length || 0,
    completedThisWeek:
      tasks?.filter((task) => {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return task.status === "completed" && new Date(task.updated_at) > weekAgo
      }).length || 0,
  }

  // Process task data for charts
  const taskStatusData = [
    { name: "To Do", value: tasks?.filter((t) => t.status === "todo").length || 0, color: "#f59e0b" },
    { name: "In Progress", value: tasks?.filter((t) => t.status === "in_progress").length || 0, color: "#3b82f6" },
    { name: "Completed", value: tasks?.filter((t) => t.status === "completed").length || 0, color: "#10b981" },
  ]

  const projectStatusData = [
    { name: "Planning", value: projects?.filter((p) => p.status === "planning").length || 0, color: "#f59e0b" },
    { name: "Active", value: projects?.filter((p) => p.status === "active").length || 0, color: "#3b82f6" },
    { name: "Completed", value: projects?.filter((p) => p.status === "completed").length || 0, color: "#10b981" },
    { name: "On Hold", value: projects?.filter((p) => p.status === "on_hold").length || 0, color: "#ef4444" },
  ]

  // Get recent projects with progress calculation
  const recentProjects =
    projects?.slice(0, 3).map((project) => {
      const projectTasks = tasks?.filter((t) => t.project_id === project.id) || []
      const completedTasks = projectTasks.filter((t) => t.status === "completed").length
      const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0

      return {
        ...project,
        progress,
        taskCount: projectTasks.length,
      }
    }) || []

  return (
    <>
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${user?.user_metadata?.full_name || "User"}! Here's what's happening with your projects.`}
        actions={
          <Link href="/dashboard/projects">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Enhanced Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                {projects?.filter((p) => p.status === "active").length || 0} active projects
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTasks}</div>
              <p className="text-xs text-muted-foreground">
                {tasks?.filter((t) => t.priority === "high" && t.status !== "completed").length || 0} high priority
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teamMembers}</div>
              <p className="text-xs text-muted-foreground">Across {stats.totalProjects} projects</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedThisWeek}</div>
              <p className="text-xs text-muted-foreground">Tasks completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Task Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <CardDescription>Current status of all tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {taskStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">
                      {item.name} ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
              <CardDescription>Overview of all project statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Projects with Real Data */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your most recently updated projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            project.status === "completed"
                              ? "bg-green-500"
                              : project.status === "active"
                                ? "bg-blue-500"
                                : project.status === "on_hold"
                                  ? "bg-red-500"
                                  : "bg-orange-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.taskCount} tasks • Updated {new Date(project.updated_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-20" />
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No projects yet</p>
                    <Link href="/dashboard/projects">
                      <Button variant="outline" className="mt-2 bg-transparent">
                        Create your first project
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity with Real Data */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{activity.profiles?.full_name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium">{activity.profiles?.full_name || "User"}</span>{" "}
                          {activity.action} {activity.entity_type}
                          {activity.details?.name && <span className="font-medium"> "{activity.details.name}"</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(activity.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/dashboard/projects">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </Link>
              <Link href="/dashboard/tasks">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <CheckSquare className="h-4 w-4" />
                  Add Task
                </Button>
              </Link>
              <Link href="/dashboard/team">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <Users className="h-4 w-4" />
                  Invite Team
                </Button>
              </Link>
              <Link href="/dashboard/files">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <FolderOpen className="h-4 w-4" />
                  Upload Files
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
