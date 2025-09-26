"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  FileText,
  ImageIcon,
  FileVideo,
  FileAudio,
  Archive,
  File,
  Download,
  MoreHorizontal,
  Calendar,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

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

interface FileCardProps {
  file: ProjectFile
  onDownload?: (file: ProjectFile) => void
  onDelete?: (fileId: string) => void
  onPreview?: (file: ProjectFile) => void
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return ImageIcon
  if (mimeType.startsWith("video/")) return FileVideo
  if (mimeType.startsWith("audio/")) return FileAudio
  if (mimeType.includes("pdf") || mimeType.includes("document")) return FileText
  if (mimeType.includes("zip") || mimeType.includes("archive")) return Archive
  return File
}

const getFileTypeColor = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return "text-green-600 bg-green-50 dark:bg-green-900/20"
  if (mimeType.startsWith("video/")) return "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
  if (mimeType.startsWith("audio/")) return "text-orange-600 bg-orange-50 dark:bg-orange-900/20"
  if (mimeType.includes("pdf") || mimeType.includes("document")) return "text-red-600 bg-red-50 dark:bg-red-900/20"
  if (mimeType.includes("zip") || mimeType.includes("archive"))
    return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
  return "text-slate-600 bg-slate-50 dark:bg-slate-900/20"
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function FileCard({ file, onDownload, onDelete, onPreview }: FileCardProps) {
  const FileIcon = getFileIcon(file.mime_type)
  const colorClass = getFileTypeColor(file.mime_type)

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={cn("p-2 rounded-lg", colorClass)}>
            <FileIcon className="h-6 w-6" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onPreview && (
                <DropdownMenuItem onClick={() => onPreview(file)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDownload?.(file)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(file.id)} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <h3
            className="font-medium text-sm leading-tight line-clamp-2 cursor-pointer hover:text-primary"
            title={file.name}
            onClick={() => onPreview?.(file)}
          >
            {file.name}
          </h3>

          <div className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(file.created_at)}
            </div>

            <div className="flex items-center gap-1">
              <Avatar className="h-4 w-4">
                <AvatarImage src={file.uploaded_by.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">{file.uploaded_by.full_name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="truncate max-w-20" title={file.uploaded_by.full_name}>
                {file.uploaded_by.full_name}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
