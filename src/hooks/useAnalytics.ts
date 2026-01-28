import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
};

// Get UTM parameters from URL
const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
  };
};

export const useAnalytics = () => {
  const sessionId = useRef(getSessionId());
  const mouseMovementsBuffer = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const lastMouseMove = useRef(0);

  // Track page view
  const trackPageView = useCallback(async () => {
    const utmParams = getUtmParams();
    
    try {
      await supabase.from("page_views").insert({
        page_url: window.location.href,
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: sessionId.current,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
      });
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }, []);

  // Track button click
  const trackClick = useCallback(async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const button = target.closest("button, a[href], [role='button'], [data-track]");
    
    if (!button) return;

    const buttonId = button.getAttribute("data-track-id") || button.id || null;
    const buttonText = button.textContent?.trim().substring(0, 100) || null;
    const buttonType = button.getAttribute("data-track-type") || 
                       (button.tagName === "A" ? "link" : "button");

    try {
      await supabase.from("button_clicks").insert({
        button_id: buttonId,
        button_text: buttonText,
        button_type: buttonType,
        page_path: window.location.pathname,
        session_id: sessionId.current,
        click_x: Math.round(event.clientX),
        click_y: Math.round(event.clientY),
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
      });
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  }, []);

  // Flush mouse movements buffer
  const flushMouseMovements = useCallback(async () => {
    if (mouseMovementsBuffer.current.length === 0) return;

    const movements = mouseMovementsBuffer.current.splice(0);
    const pagePath = window.location.pathname;

    try {
      await supabase.from("mouse_movements").insert(
        movements.map((m) => ({
          page_path: pagePath,
          x_position: m.x,
          y_position: m.y,
          session_id: sessionId.current,
        }))
      );
    } catch (error) {
      console.error("Error tracking mouse movements:", error);
    }
  }, []);

  // Track mouse movement (sampled)
  const trackMouseMove = useCallback((event: MouseEvent) => {
    const now = Date.now();
    if (now - lastMouseMove.current < 500) return; // Sample every 500ms
    
    lastMouseMove.current = now;
    mouseMovementsBuffer.current.push({
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
      timestamp: now,
    });

    // Flush buffer when it reaches 20 movements
    if (mouseMovementsBuffer.current.length >= 20) {
      flushMouseMovements();
    }
  }, [flushMouseMovements]);

  useEffect(() => {
    // Track page view on mount
    trackPageView();

    // Add event listeners
    document.addEventListener("click", trackClick, { capture: true });
    document.addEventListener("mousemove", trackMouseMove);

    // Flush mouse movements periodically
    const flushInterval = setInterval(flushMouseMovements, 10000);

    // Flush on page unload
    const handleBeforeUnload = () => {
      flushMouseMovements();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", trackClick, { capture: true });
      document.removeEventListener("mousemove", trackMouseMove);
      clearInterval(flushInterval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      flushMouseMovements();
    };
  }, [trackPageView, trackClick, trackMouseMove, flushMouseMovements]);
};

export default useAnalytics;
