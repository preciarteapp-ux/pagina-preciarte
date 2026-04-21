// Helper para registrar eventos do quiz na tabela quiz_events
import { supabase } from "@/integrations/supabase/client";
import { getStoredUtms } from "./checkout";

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
};

const getDeviceType = (): string => {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry/.test(ua)) {
    if (/android/.test(ua) && !/mobile/.test(ua)) return "tablet";
    return "mobile";
  }
  return "desktop";
};

export type QuizEventType =
  | "quiz_started"
  | "question_answered"
  | "quiz_completed"
  | "checkout_clicked";

export interface TrackQuizPayload {
  event_type: QuizEventType;
  question_index?: number | null;
  question_id?: string | null;
  answer_value?: number | null;
  answer_label?: string | null;
  plan_clicked?: string | null;
  monthly_loss?: number | null;
}

export const trackQuizEvent = async (payload: TrackQuizPayload) => {
  if (typeof window === "undefined") return;
  try {
    const utms = getStoredUtms();
    await supabase.from("quiz_events").insert({
      session_id: getSessionId(),
      event_type: payload.event_type,
      question_index: payload.question_index ?? null,
      question_id: payload.question_id ?? null,
      answer_value: payload.answer_value ?? null,
      answer_label: payload.answer_label ?? null,
      plan_clicked: payload.plan_clicked ?? null,
      monthly_loss: payload.monthly_loss ?? null,
      utm_source: utms.utm_source ?? null,
      utm_medium: utms.utm_medium ?? null,
      utm_campaign: utms.utm_campaign ?? null,
      device_type: getDeviceType(),
      user_agent: navigator.userAgent.substring(0, 500),
    });
  } catch {
    // fire-and-forget — nunca quebra a UX do quiz
  }
};
