"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileCard } from "@/components/files/file-card"
import { FileUpload } from "@/components/files/file-upload"
import { FilePreview } from "@/components/files/file-preview"
import { createClient } from "@/lib/supabase/client"
import { Plus, Search, Grid, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProjectFile {
  id: string
  name: string
  file_path: string
  file_size: number
  mime_type: string
  file_url?: string
  uploaded_by: {
    id: string
    full_name: string
    avatar_url?: string
  }
  created_at: string
}

export default function FilesPage() {
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<ProjectFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchFiles()
  }, [])

  useEffect(() => {
    filterFiles()
  }, [files, searchQuery, typeFilter])

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from("project_files")
        .select(`
          *,
          uploaded_by:profiles(id, full_name, avatar_url)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setFiles(data || [])
    } catch (error) {
      console.error("Error fetching files:", error)
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterFiles = () => {
    let filtered = files

    if (searchQuery) {
      filtered = filtered.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((file) => {
        switch (typeFilter) {
          case "images":
            return file.mime_type.startsWith("image/")
          case "documents":
            return (
              file.mime_type.includes("pdf") || file.mime_type.includes("document") || file.mime_type.includes("text")
            )
          case "videos":
            return file.mime_type.startsWith("video/")
          case "audio":
            return file.mime_type.startsWith("audio/")
          default:
            return true
        }
      })
    }

    setFilteredFiles(filtered)
  }

  const handleUpload = async (uploadFiles: File[]) => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error("Not authenticated")

      const formData = new FormData()
      uploadFiles.forEach((file) => {
        formData.append("files", file)
      })
      formData.append("projectId", "00000000-0000-0000-0000-000000000000") // Default project

      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: result.message,
      })

      setIsUploadOpen(false)
      fetchFiles()
    } catch (error) {
      console.error("Error uploading files:", error)
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleDownload = async (file: ProjectFile) => {
    try {
      if (file.file_url) {
        const link = document.createElement("a")
        link.href = file.file_url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: "Download Started",
          description: `Downloading ${file.name}`,
        })
      } else {
        // Fallback for files without direct URLs
        toast({
          title: "Download Started",
          description: `Downloading ${file.name}`,
        })
      }
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: result.message,
      })

      fetchFiles()
    } catch (error) {
      console.error("Error deleting file:", error)
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading files...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header
        title="Files"
        subtitle={`${filteredFiles.length} files found`}
        actions={
          <div className="flex gap-2">
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Files
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Files</DialogTitle>
                </DialogHeader>
                <FileUpload
                  onUpload={handleUpload}
                  maxFiles={10}
                  maxSize={50}
                  acceptedTypes={["image", "document", "pdf", "video", "audio"]}
                  projectId="00000000-0000-0000-0000-000000000000"
                />
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="File Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="images">Images</SelectItem>
              <SelectItem value="documents">Documents</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Files Grid/List */}
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              {files.length === 0 ? "No files yet. Upload your first file!" : "No files match your filters."}
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                : "space-y-2"
            }
          >
            {filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onPreview={setPreviewFile}
              />
            ))}
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      <FilePreview
        file={previewFile}
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        onDownload={handleDownload}
      />
    </>
  )
}
