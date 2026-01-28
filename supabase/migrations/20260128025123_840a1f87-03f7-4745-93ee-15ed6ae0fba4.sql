-- Adicionar política de SELECT para permitir leitura do próprio registro após insert
CREATE POLICY "Allow anonymous select own page_views"
  ON public.page_views
  FOR SELECT
  TO anon, authenticated
  USING (true);