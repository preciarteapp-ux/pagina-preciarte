-- Adicionar colunas de geolocalização em page_views
ALTER TABLE public.page_views ADD COLUMN country text;
ALTER TABLE public.page_views ADD COLUMN country_code text;
ALTER TABLE public.page_views ADD COLUMN region text;
ALTER TABLE public.page_views ADD COLUMN city text;

-- Criar tabela de sessões ativas para rastrear visitantes online
CREATE TABLE public.active_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  page_path text NOT NULL,
  last_seen timestamptz NOT NULL DEFAULT now(),
  country text,
  country_code text,
  city text
);

-- Habilitar RLS e criar policy para permitir upsert anônimo
ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous upsert active_sessions" ON public.active_sessions
  FOR ALL USING (true) WITH CHECK (true);

-- Index para performance na consulta de sessões ativas
CREATE INDEX idx_active_sessions_last_seen ON public.active_sessions(last_seen);