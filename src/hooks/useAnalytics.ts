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

// Detect device type from user agent
const getDeviceType = (userAgent: string): string => {
  const ua = userAgent.toLowerCase();
  
  // Tablet detection first (before mobile, as tablets may contain "mobile")
  if (/ipad|tablet|playbook|silk/.test(ua)) {
    return "tablet";
  }
  
  // Mobile detection
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/.test(ua)) {
    // Android tablets often don't have "mobile" in UA
    if (/android/.test(ua) && !/mobile/.test(ua)) {
      return "tablet";
    }
    return "mobile";
  }
  
  return "desktop";
};

// Geolocation data interface
interface GeoData {
  country: string | null;
  countryCode: string | null;
  regionName: string | null;
  city: string | null;
}

// Fetch geolocation data from ipapi.co (HTTPS)
const fetchGeoData = async (): Promise<GeoData> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch geo data");
    }
    const data = await response.json();
    return {
      country: data.country_name || null,
      countryCode: data.country_code || null,
      regionName: data.region || null,
      city: data.city || null,
    };
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return {
      country: null,
      countryCode: null,
      regionName: null,
      city: null,
    };
  }
};

export const useAnalytics = () => {
  const sessionId = useRef(getSessionId());
  const mouseMovementsBuffer = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const lastMouseMove = useRef(0);
  const geoData = useRef<GeoData | null>(null);
  const heartbeatInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const pageViewId = useRef<string | null>(null);
  const pageEntryTime = useRef<number>(Date.now());
  
  // New refs for scroll and interaction tracking
  const maxScrollDepth = useRef<number>(0);
  const interactionCount = useRef<number>(0);
  const lastScrollUpdate = useRef<number>(0);

  // Track scroll depth
  const trackScroll = useCallback(() => {
    const now = Date.now();
    // Debounce scroll tracking (every 100ms)
    if (now - lastScrollUpdate.current < 100) return;
    lastScrollUpdate.current = now;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    // Calculate scroll percentage
    const scrollPercent = Math.round(
      ((scrollTop + viewportHeight) / pageHeight) * 100
    );

    // Only save if greater than previous max
    if (scrollPercent > maxScrollDepth.current) {
      maxScrollDepth.current = Math.min(scrollPercent, 100);
    }
  }, []);

  // Track page view with geolocation and device type
  const trackPageView = useCallback(async () => {
    const utmParams = getUtmParams();
    const deviceType = getDeviceType(navigator.userAgent);
    pageEntryTime.current = Date.now();
    maxScrollDepth.current = 0;
    interactionCount.current = 0;
    
    // Fetch geo data if not already fetched
    if (!geoData.current) {
      geoData.current = await fetchGeoData();
    }
    
    try {
      const { data, error } = await supabase.from("page_views").insert({
        page_url: window.location.href,
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: sessionId.current,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        country: geoData.current?.country || null,
        country_code: geoData.current?.countryCode || null,
        region: geoData.current?.regionName || null,
        city: geoData.current?.city || null,
        device_type: deviceType,
        is_bounce: true, // Default to true, will update on exit
        interaction_count: 0,
        max_scroll_depth: 0,
      }).select('id').single();
      
      if (error) {
        console.error("Error tracking page view:", error);
      } else if (data) {
        pageViewId.current = data.id;
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }, []);

  // Update active session (heartbeat)
  const updateActiveSession = useCallback(async () => {
    if (!geoData.current) {
      geoData.current = await fetchGeoData();
    }

    try {
      // Upsert the active session
      await supabase.from("active_sessions").upsert(
        {
          session_id: sessionId.current,
          page_path: window.location.pathname,
          last_seen: new Date().toISOString(),
          country: geoData.current?.country || null,
          country_code: geoData.current?.countryCode || null,
          city: geoData.current?.city || null,
        },
        { onConflict: "session_id" }
      );
    } catch (error) {
      console.error("Error updating active session:", error);
    }
  }, []);

  // Track button click
  const trackClick = useCallback(async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const button = target.closest("button, a[href], [role='button'], [data-track]");
    
    // Increment interaction count for any click
    interactionCount.current++;
    
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

  // Update page view metrics (time, scroll, bounce)
  const updatePageMetrics = useCallback(async () => {
    if (!pageViewId.current) return;
    
    const timeOnPage = Math.floor((Date.now() - pageEntryTime.current) / 1000);
    
    // Determine if this is a bounce (less than 10 seconds AND no interactions)
    const isBounce = timeOnPage < 10 && interactionCount.current === 0;
    
    try {
      await supabase
        .from("page_views")
        .update({ 
          time_on_page: timeOnPage,
          max_scroll_depth: maxScrollDepth.current,
          interaction_count: interactionCount.current,
          is_bounce: isBounce,
        })
        .eq("id", pageViewId.current);
    } catch (error) {
      console.error("Error updating page metrics:", error);
    }
  }, []);

  useEffect(() => {
    // Track page view on mount
    trackPageView();

    // Initial heartbeat
    updateActiveSession();

    // Set up heartbeat interval (every 30 seconds)
    heartbeatInterval.current = setInterval(() => {
      updateActiveSession();
      // Also update metrics periodically
      updatePageMetrics();
    }, 30000);

    // Add event listeners
    document.addEventListener("click", trackClick, { capture: true });
    document.addEventListener("mousemove", trackMouseMove);
    window.addEventListener("scroll", trackScroll, { passive: true });

    // Flush mouse movements periodically
    const flushInterval = setInterval(flushMouseMovements, 10000);

    // Handle page unload - save all metrics
    const handleBeforeUnload = () => {
      flushMouseMovements();
      updatePageMetrics();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Handle visibility change (for mobile browsers)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updatePageMetrics();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("click", trackClick, { capture: true });
      document.removeEventListener("mousemove", trackMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", trackScroll);
      clearInterval(flushInterval);
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
      flushMouseMovements();
      updatePageMetrics();
    };
  }, [trackPageView, trackClick, trackMouseMove, flushMouseMovements, updateActiveSession, updatePageMetrics, trackScroll]);
};

export default useAnalytics;
