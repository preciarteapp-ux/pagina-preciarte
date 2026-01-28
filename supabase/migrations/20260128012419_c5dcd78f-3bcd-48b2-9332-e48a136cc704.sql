-- Adicionar colunas para bounce rate e scroll depth tracking
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS is_bounce boolean DEFAULT true;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS interaction_count integer DEFAULT 0;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS max_scroll_depth integer DEFAULT 0;