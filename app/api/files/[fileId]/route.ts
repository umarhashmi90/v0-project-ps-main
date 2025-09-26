import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest, { params }: { params: { fileId: string } }) {
  try {
    const supabase = createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const fileId = params.fileId

    // Get file record to get the file path
    const { data: fileRecord, error: fetchError } = await supabase
      .from("project_files")
      .select("file_path, uploaded_by")
      .eq("id", fileId)
      .single()

    if (fetchError || !fileRecord) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Check if user owns the file or has admin rights
    // For now, allow any authenticated user to delete
    // In production, you'd want proper permission checks

    // Delete from storage
    const { error: storageError } = await supabase.storage.from("project-files").remove([fileRecord.file_path])

    if (storageError) {
      console.error("Storage deletion error:", storageError)
    }

    // Delete from database
    const { error: dbError } = await supabase.from("project_files").delete().eq("id", fileId)

    if (dbError) {
      console.error("Database deletion error:", dbError)
      return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
    }

    return NextResponse.json({ message: "File deleted successfully" })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { fileId: string } }) {
  try {
    const supabase = createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const fileId = params.fileId

    // Get file record
    const { data: fileRecord, error: fetchError } = await supabase
      .from("project_files")
      .select(`
        *,
        uploaded_by:profiles(id, full_name, avatar_url)
      `)
      .eq("id", fileId)
      .single()

    if (fetchError || !fileRecord) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    return NextResponse.json({ file: fileRecord })
  } catch (error) {
    console.error("Get file error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
