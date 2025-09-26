-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create task comments table
CREATE TABLE IF NOT EXISTS public.task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.task_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tasks
CREATE POLICY "Users can view tasks in their projects" ON public.tasks FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Project members can create tasks" ON public.tasks FOR INSERT 
WITH CHECK (
  creator_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Project members can update tasks" ON public.tasks FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

-- RLS Policies for task comments
CREATE POLICY "Users can view comments on tasks in their projects" ON public.task_comments FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.tasks t
    JOIN public.project_members pm ON t.project_id = pm.project_id
    WHERE t.id = task_comments.task_id AND pm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create comments on tasks in their projects" ON public.task_comments FOR INSERT 
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.tasks t
    JOIN public.project_members pm ON t.project_id = pm.project_id
    WHERE t.id = task_comments.task_id AND pm.user_id = auth.uid()
  )
);
