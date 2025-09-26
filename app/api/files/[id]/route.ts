import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const fileId = params.id

    // Get file info first
    const { data: file, error: fetchError } = await supabase.from("project_files").select("*").eq("id", fileId).single()

    if (fetchError || !file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Check if user owns the file or has permission
    if (file.uploaded_by !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage.from("project-files").remove([file.file_path])

    if (storageError) {
      console.error("Storage deletion error:", storageError)
    }

    // Delete from database
    const { error: dbError } = await supabase.from("project_files").delete().eq("id", fileId)

    if (dbError) {
      return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "File deleted successfully" })
  } catch (error) {
    console.error("Delete API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const fileId = params.id

    // Get file info
    const { data: file, error: fetchError } = await supabase
      .from("project_files")
      .select(`
        *,
        uploaded_by:profiles(id, full_name, avatar_url)
      `)
      .eq("id", fileId)
      .single()

    if (fetchError || !file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    return NextResponse.json({ file })
  } catch (error) {
    console.error("Get file API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
