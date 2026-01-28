-- Adicionar colunas para tempo na página e tipo de dispositivo
ALTER TABLE public.page_views ADD COLUMN time_on_page integer;
ALTER TABLE public.page_views ADD COLUMN device_type text;

-- Habilitar UPDATE para o hook poder atualizar time_on_page
CREATE POLICY "Allow anonymous update time_on_page" ON public.page_views
  FOR UPDATE USING (true) WITH CHECK (true);