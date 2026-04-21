CREATE TABLE public.quiz_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  question_index INTEGER,
  question_id TEXT,
  answer_value NUMERIC,
  answer_label TEXT,
  plan_clicked TEXT,
  monthly_loss NUMERIC,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_quiz_events_session ON public.quiz_events(session_id);
CREATE INDEX idx_quiz_events_created_at ON public.quiz_events(created_at DESC);
CREATE INDEX idx_quiz_events_type ON public.quiz_events(event_type);
CREATE INDEX idx_quiz_events_question ON public.quiz_events(question_index);

ALTER TABLE public.quiz_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert quiz_events"
ON public.quiz_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous select quiz_events"
ON public.quiz_events
FOR SELECT
TO anon, authenticated
USING (true);