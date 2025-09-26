"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, X, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<void>
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
  className?: string
  projectId?: string // Added projectId prop
}

export function FileUpload({
  onUpload,
  maxFiles = 10,
  maxSize = 10,
  acceptedTypes = [],
  className,
  projectId, // Added projectId parameter
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    handleFileSelection(files)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFileSelection(files)
  }, [])

  const handleFileSelection = (files: File[]) => {
    const validFiles = files.filter((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        console.warn(`File ${file.name} is too large (max ${maxSize}MB)`)
        return false
      }

      // Check file type if specified
      if (acceptedTypes.length > 0 && !acceptedTypes.some((type) => file.type.includes(type))) {
        console.warn(`File ${file.name} type not accepted`)
        return false
      }

      return true
    })

    setSelectedFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles))
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("files", file)
      })
      if (projectId) {
        formData.append("projectId", projectId)
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Call the original onUpload callback for compatibility
      await onUpload(selectedFiles)

      // Reset after successful upload
      setTimeout(() => {
        setSelectedFiles([])
        setUploadProgress(0)
        setIsUploading(false)
      }, 1000)
    } catch (error) {
      console.error("Upload failed:", error)
      setIsUploading(false)
      setUploadProgress(0)
      throw error
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          isUploading && "pointer-events-none opacity-50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Upload className={cn("h-10 w-10 mb-4", isDragOver ? "text-primary" : "text-muted-foreground")} />
          <div className="space-y-2">
            <p className="text-sm font-medium">{isDragOver ? "Drop files here" : "Click to upload or drag and drop"}</p>
            <p className="text-xs text-muted-foreground">
              Max {maxFiles} files, {maxSize}MB each
              {acceptedTypes.length > 0 && ` • ${acceptedTypes.join(", ")}`}
            </p>
          </div>
          <input
            id="file-input"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            accept={acceptedTypes.join(",")}
          />
        </CardContent>
      </Card>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Files ({selectedFiles.length})</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                <File className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                {!isUploading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading files...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && !isUploading && (
        <Button onClick={handleUpload} className="w-full">
          Upload {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""}
        </Button>
      )}
    </div>
  )
}
