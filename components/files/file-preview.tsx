"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Calendar, FileText, ImageIcon, FileVideo, FileAudio } from "lucide-react"

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

interface FilePreviewProps {
  file: ProjectFile | null
  isOpen: boolean
  onClose: () => void
  onDownload?: (file: ProjectFile) => void
}

export function FilePreview({ file, isOpen, onClose, onDownload }: FilePreviewProps) {
  const [imageError, setImageError] = useState(false)

  if (!file) return null

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return ImageIcon
    if (mimeType.startsWith("video/")) return FileVideo
    if (mimeType.startsWith("audio/")) return FileAudio
    return FileText
  }

  const canPreview = (mimeType: string) => {
    return (
      mimeType.startsWith("image/") ||
      mimeType.startsWith("video/") ||
      mimeType.startsWith("audio/") ||
      mimeType === "application/pdf"
    )
  }

  const renderPreview = () => {
    if (!file.file_url || !canPreview(file.mime_type)) {
      const FileIcon = getFileIcon(file.mime_type)
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
          <FileIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">Preview not available</p>
        </div>
      )
    }

    if (file.mime_type.startsWith("image/")) {
      return (
        <div className="relative">
          {!imageError ? (
            <img
              src={file.file_url || "/placeholder.svg"}
              alt={file.name}
              className="max-w-full max-h-96 mx-auto rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
              <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">Failed to load image</p>
            </div>
          )}
        </div>
      )
    }

    if (file.mime_type.startsWith("video/")) {
      return (
        <video controls className="max-w-full max-h-96 mx-auto rounded-lg" preload="metadata">
          <source src={file.file_url} type={file.mime_type} />
          Your browser does not support the video tag.
        </video>
      )
    }

    if (file.mime_type.startsWith("audio/")) {
      return (
        <div className="flex flex-col items-center justify-center h-32 bg-muted rounded-lg">
          <audio controls className="w-full max-w-md">
            <source src={file.file_url} type={file.mime_type} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )
    }

    if (file.mime_type === "application/pdf") {
      return <iframe src={file.file_url} className="w-full h-96 rounded-lg border" title={file.name} />
    }

    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="truncate">{file.name}</span>
            <Badge variant="secondary" className="text-xs">
              {formatFileSize(file.file_size)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Preview */}
          <div className="border rounded-lg p-4">{renderPreview()}</div>

          {/* File Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">File Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Type:</span>
                  <span>{file.mime_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span>{formatDate(file.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Uploaded By</h4>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={file.uploaded_by.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>{file.uploaded_by.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{file.uploaded_by.full_name}</p>
                  <p className="text-sm text-muted-foreground">Team Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={() => onDownload?.(file)} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
