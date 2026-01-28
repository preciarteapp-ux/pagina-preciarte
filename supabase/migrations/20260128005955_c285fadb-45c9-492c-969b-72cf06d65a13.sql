-- Create table for page views
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for button clicks
CREATE TABLE public.button_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  button_id TEXT,
  button_text TEXT,
  button_type TEXT,
  page_path TEXT NOT NULL,
  session_id TEXT NOT NULL,
  click_x INTEGER,
  click_y INTEGER,
  viewport_width INTEGER,
  viewport_height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for mouse movements (for heatmap)
CREATE TABLE public.mouse_movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  x_position INTEGER NOT NULL,
  y_position INTEGER NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.button_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mouse_movements ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT for tracking (visitors don't need to be authenticated)
CREATE POLICY "Allow anonymous insert page_views" 
ON public.page_views 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous insert button_clicks" 
ON public.button_clicks 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous insert mouse_movements" 
ON public.mouse_movements 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_page_views_page_path ON public.page_views(page_path);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);
CREATE INDEX idx_button_clicks_page_path ON public.button_clicks(page_path);
CREATE INDEX idx_button_clicks_created_at ON public.button_clicks(created_at);
CREATE INDEX idx_mouse_movements_page_path ON public.mouse_movements(page_path);