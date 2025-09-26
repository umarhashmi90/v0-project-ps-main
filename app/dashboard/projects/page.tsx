"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectForm } from "@/components/projects/project-form"
import { createClient } from "@/lib/supabase/client"
import { Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchQuery, statusFilter, priorityFilter])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          owner:profiles!projects_owner_id_fkey(id, full_name, avatar_url),
          project_members(count),
          tasks(count, status)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Process the data to include counts
      const processedProjects = (data || []).map((project: any) => ({
        ...project,
        members_count: project.project_members?.[0]?.count || 0,
        tasks_count: project.tasks?.length || 0,
        completed_tasks_count: project.tasks?.filter((task: any) => task.status === "completed").length || 0,
      }))

      setProjects(processedProjects)
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((project) => project.priority === priorityFilter)
    }

    setFilteredProjects(filtered)
  }

  const handleCreateProject = async (formData: any) => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error("Not authenticated")

      const { data: project, error } = await supabase
        .from("projects")
        .insert({
          ...formData,
          owner_id: user.user.id,
          start_date: formData.start_date?.toISOString().split("T")[0],
          due_date: formData.due_date?.toISOString().split("T")[0],
        })
        .select()
        .single()

      if (error) throw error

      // Add the creator as a project member
      await supabase.from("project_members").insert({
        project_id: project.id,
        user_id: user.user.id,
        role: "owner",
      })

      toast({
        title: "Success",
        description: "Project created successfully",
      })

      setIsFormOpen(false)
      fetchProjects()
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProject = async (formData: any) => {
    if (!editingProject) return

    try {
      const { error } = await supabase
        .from("projects")
        .update({
          ...formData,
          start_date: formData.start_date?.toISOString().split("T")[0],
          due_date: formData.due_date?.toISOString().split("T")[0],
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingProject.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Project updated successfully",
      })

      setEditingProject(null)
      fetchProjects()
    } catch (error) {
      console.error("Error updating project:", error)
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", projectId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Project deleted successfully",
      })

      fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header
        title="Projects"
        subtitle={`${filteredProjects.length} projects found`}
        actions={
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <ProjectForm onSubmit={handleCreateProject} onCancel={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              {projects.length === 0
                ? "No projects yet. Create your first project!"
                : "No projects match your filters."}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={setEditingProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}

        {/* Edit Project Dialog */}
        <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
          <DialogContent className="max-w-2xl">
            {editingProject && (
              <ProjectForm
                initialData={{
                  ...editingProject,
                  start_date: editingProject.start_date ? new Date(editingProject.start_date) : undefined,
                  due_date: editingProject.due_date ? new Date(editingProject.due_date) : undefined,
                }}
                onSubmit={handleUpdateProject}
                onCancel={() => setEditingProject(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
