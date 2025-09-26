-- Add file_url column to project_files table for storing public URLs
ALTER TABLE project_files ADD COLUMN IF NOT EXISTS file_url TEXT;

-- Create storage bucket policy for project files
-- Note: This would typically be done in Supabase dashboard, but included for reference
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);

-- Create RLS policies for file storage
-- CREATE POLICY "Users can upload files" ON storage.objects FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
-- CREATE POLICY "Users can view files" ON storage.objects FOR SELECT USING (true);
-- CREATE POLICY "Users can delete own files" ON storage.objects FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Update existing records to have file_url if needed
-- UPDATE project_files SET file_url = 'https://your-project.supabase.co/storage/v1/object/public/project-files/' || file_path WHERE file_url IS NULL;
