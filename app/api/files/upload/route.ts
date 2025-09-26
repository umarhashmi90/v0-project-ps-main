import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
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

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const projectId = (formData.get("projectId") as string) || "00000000-0000-0000-0000-000000000000"

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploadResults = []

    for (const file of files) {
      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `uploads/${user.id}/${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-files")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Upload error:", uploadError)
        continue
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("project-files").getPublicUrl(filePath)

      // Save file metadata to database
      const { data: fileRecord, error: dbError } = await supabase
        .from("project_files")
        .insert({
          name: file.name,
          file_path: filePath,
          file_url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          project_id: projectId,
          uploaded_by: user.id,
        })
        .select()
        .single()

      if (dbError) {
        console.error("Database error:", dbError)
        // Clean up uploaded file if database insert fails
        await supabase.storage.from("project-files").remove([filePath])
        continue
      }

      uploadResults.push(fileRecord)
    }

    return NextResponse.json({
      success: true,
      files: uploadResults,
      message: `${uploadResults.length} file(s) uploaded successfully`,
    })
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
