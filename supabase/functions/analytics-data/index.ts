import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple password validation
const ANALYTICS_PASSWORD = "Dhsc9205@";

// Brasília timezone helpers (UTC-3)
const toBrasiliaTime = (date: Date): Date => {
  const brasiliaOffset = -3 * 60 * 60 * 1000; // -3 hours in ms
  return new Date(date.getTime() + brasiliaOffset);
};

const getBrasiliaHour = (isoString: string): number => {
  const date = new Date(isoString);
  const brasiliaDate = toBrasiliaTime(date);
  return brasiliaDate.getUTCHours();
};

const getBrasiliaToday = (): Date => {
  const now = new Date();
  const brasiliaDate = toBrasiliaTime(now);
  // Reset to midnight in Brasília
  brasiliaDate.setUTCHours(0, 0, 0, 0);
  // Convert back to UTC (add 3 hours)
  return new Date(brasiliaDate.getTime() + 3 * 60 * 60 * 1000);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get password from request
    const { password, period, page_path } = await req.json();

    if (password !== ANALYTICS_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role key for reading data
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "7days":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30days":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Build queries with filters
    let pageViewsQuery = supabase
      .from("page_views")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    let buttonClicksQuery = supabase
      .from("button_clicks")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    let mouseMovementsQuery = supabase
      .from("mouse_movements")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .limit(5000);

    // Query for active sessions (last 5 minutes)
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    const activeSessionsQuery = supabase
      .from("active_sessions")
      .select("*")
      .gte("last_seen", fiveMinutesAgo);

    // Apply page path filter if provided
    if (page_path && page_path !== "all") {
      pageViewsQuery = pageViewsQuery.eq("page_path", page_path);
      buttonClicksQuery = buttonClicksQuery.eq("page_path", page_path);
      mouseMovementsQuery = mouseMovementsQuery.eq("page_path", page_path);
    }

    // Execute queries in parallel
    const [pageViewsResult, buttonClicksResult, mouseMovementsResult, activeSessionsResult] = await Promise.all([
      pageViewsQuery,
      buttonClicksQuery,
      mouseMovementsQuery,
      activeSessionsQuery,
    ]);

    if (pageViewsResult.error) {
      throw new Error(`Page views error: ${pageViewsResult.error.message}`);
    }
    if (buttonClicksResult.error) {
      throw new Error(`Button clicks error: ${buttonClicksResult.error.message}`);
    }
    if (mouseMovementsResult.error) {
      throw new Error(`Mouse movements error: ${mouseMovementsResult.error.message}`);
    }
    if (activeSessionsResult.error) {
      throw new Error(`Active sessions error: ${activeSessionsResult.error.message}`);
    }

    // Calculate aggregate statistics
    const pageViews = pageViewsResult.data || [];
    const buttonClicks = buttonClicksResult.data || [];
    const mouseMovements = mouseMovementsResult.data || [];
    const activeSessions = activeSessionsResult.data || [];

    // Unique sessions
    const uniqueSessions = new Set(pageViews.map((pv) => pv.session_id)).size;

    // Visits today (using Brasília timezone)
    const brasiliaToday = getBrasiliaToday();
    const visitsToday = pageViews.filter(
      (pv) => new Date(pv.created_at) >= brasiliaToday
    ).length;

    // Clicks by button
    const clicksByButton: Record<string, { count: number; text: string; type: string }> = {};
    buttonClicks.forEach((click) => {
      const key = click.button_id || click.button_text || "unknown";
      if (!clicksByButton[key]) {
        clicksByButton[key] = { count: 0, text: click.button_text || "", type: click.button_type || "" };
      }
      clicksByButton[key].count++;
    });

    // Views by page
    const viewsByPage: Record<string, number> = {};
    pageViews.forEach((pv) => {
      const path = pv.page_path || "/";
      viewsByPage[path] = (viewsByPage[path] || 0) + 1;
    });

    // Views by day
    const viewsByDay: Record<string, number> = {};
    pageViews.forEach((pv) => {
      const date = new Date(pv.created_at).toISOString().split("T")[0];
      viewsByDay[date] = (viewsByDay[date] || 0) + 1;
    });

    // Views by hour (using Brasília timezone)
    const viewsByHour: Record<number, number> = {};
    pageViews.forEach((pv) => {
      const hour = getBrasiliaHour(pv.created_at);
      viewsByHour[hour] = (viewsByHour[hour] || 0) + 1;
    });

    // UTM sources
    const utmSources: Record<string, number> = {};
    pageViews.forEach((pv) => {
      if (pv.utm_source) {
        utmSources[pv.utm_source] = (utmSources[pv.utm_source] || 0) + 1;
      }
    });

    // Geography data
    const viewsByCountry: Record<string, number> = {};
    const viewsByRegion: Record<string, number> = {};
    const viewsByCity: Record<string, number> = {};
    const countryCodes: Record<string, string> = {};

    pageViews.forEach((pv) => {
      if (pv.country) {
        viewsByCountry[pv.country] = (viewsByCountry[pv.country] || 0) + 1;
        if (pv.country_code) {
          countryCodes[pv.country] = pv.country_code;
        }
      }
      if (pv.region) {
        viewsByRegion[pv.region] = (viewsByRegion[pv.region] || 0) + 1;
      }
      if (pv.city) {
        viewsByCity[pv.city] = (viewsByCity[pv.city] || 0) + 1;
      }
    });

    // Online now data
    const onlineNow = activeSessions.length;
    const onlineDetails = activeSessions.map((session) => ({
      city: session.city,
      country: session.country,
      page: session.page_path,
    }));

    // Time on page calculations
    const viewsWithTime = pageViews.filter((pv) => pv.time_on_page && pv.time_on_page > 0);
    const avgTimeOnPage = viewsWithTime.length > 0
      ? viewsWithTime.reduce((sum, pv) => sum + (pv.time_on_page || 0), 0) / viewsWithTime.length
      : 0;

    // Average time by page
    const avgTimeByPage: Record<string, number> = {};
    const timeByPageCount: Record<string, { total: number; count: number }> = {};
    
    viewsWithTime.forEach((pv) => {
      const path = pv.page_path || "/";
      if (!timeByPageCount[path]) {
        timeByPageCount[path] = { total: 0, count: 0 };
      }
      timeByPageCount[path].total += pv.time_on_page || 0;
      timeByPageCount[path].count++;
    });
    
    Object.entries(timeByPageCount).forEach(([path, data]) => {
      avgTimeByPage[path] = data.total / data.count;
    });

    // Device statistics
    const viewsByDevice: Record<string, number> = {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    };
    
    pageViews.forEach((pv) => {
      const device = pv.device_type || "desktop";
      viewsByDevice[device] = (viewsByDevice[device] || 0) + 1;
    });

    // ========== BOUNCE RATE CALCULATIONS ==========
    // Count bounces (is_bounce = true)
    const bounceCount = pageViews.filter((pv) => pv.is_bounce === true).length;
    const bounceRate = pageViews.length > 0 
      ? ((bounceCount / pageViews.length) * 100).toFixed(1)
      : "0";

    // Bounce rate by page
    const bounceByPage: Record<string, { bounces: number; total: number }> = {};
    pageViews.forEach((pv) => {
      const path = pv.page_path || "/";
      if (!bounceByPage[path]) {
        bounceByPage[path] = { bounces: 0, total: 0 };
      }
      bounceByPage[path].total++;
      if (pv.is_bounce === true) {
        bounceByPage[path].bounces++;
      }
    });

    const bounceRateByPage: Record<string, number> = {};
    Object.entries(bounceByPage).forEach(([path, data]) => {
      bounceRateByPage[path] = data.total > 0 
        ? Math.round((data.bounces / data.total) * 100)
        : 0;
    });

    // ========== SCROLL DEPTH CALCULATIONS ==========
    const viewsWithScroll = pageViews.filter((pv) => 
      pv.max_scroll_depth !== null && pv.max_scroll_depth !== undefined && pv.max_scroll_depth > 0
    );
    
    const avgScrollDepth = viewsWithScroll.length > 0
      ? Math.round(viewsWithScroll.reduce((sum, pv) => sum + (pv.max_scroll_depth || 0), 0) / viewsWithScroll.length)
      : 0;

    // Scroll depth by page
    const scrollByPage: Record<string, { total: number; count: number }> = {};
    viewsWithScroll.forEach((pv) => {
      const path = pv.page_path || "/";
      if (!scrollByPage[path]) {
        scrollByPage[path] = { total: 0, count: 0 };
      }
      scrollByPage[path].total += pv.max_scroll_depth || 0;
      scrollByPage[path].count++;
    });

    const scrollDepthByPage: Record<string, number> = {};
    Object.entries(scrollByPage).forEach(([path, data]) => {
      scrollDepthByPage[path] = data.count > 0 
        ? Math.round(data.total / data.count)
        : 0;
    });

    // Scroll funnel (percentage of users reaching each milestone)
    const scrollMilestones = [25, 50, 75, 100];
    const scrollFunnel: Record<number, number> = {};
    
    scrollMilestones.forEach((milestone) => {
      const reachedMilestone = viewsWithScroll.filter(
        (pv) => (pv.max_scroll_depth || 0) >= milestone
      ).length;
      scrollFunnel[milestone] = viewsWithScroll.length > 0
        ? Math.round((reachedMilestone / viewsWithScroll.length) * 100)
        : 0;
    });

    // ========== ENGAGEMENT SCORE ==========
    // Simple engagement score: combination of scroll, time, and interactions
    const avgInteractionCount = pageViews.length > 0
      ? pageViews.reduce((sum, pv) => sum + (pv.interaction_count || 0), 0) / pageViews.length
      : 0;

    // Normalize each metric to 0-100 and average
    const scrollScore = avgScrollDepth; // Already 0-100
    const timeScore = Math.min((avgTimeOnPage / 120) * 100, 100); // 2 minutes = 100%
    const interactionScore = Math.min(avgInteractionCount * 10, 100); // 10 interactions = 100%
    
    const engagementScore = Math.round((scrollScore + timeScore + interactionScore) / 3);

    // Recent visits (last 20)
    const recentVisits = pageViews.slice(0, 20).map((pv) => ({
      page_path: pv.page_path,
      created_at: pv.created_at,
      referrer: pv.referrer,
      utm_source: pv.utm_source,
      utm_medium: pv.utm_medium,
      utm_campaign: pv.utm_campaign,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          totalViews: pageViews.length,
          uniqueSessions,
          visitsToday,
          totalClicks: buttonClicks.length,
          ctr: pageViews.length > 0 ? ((buttonClicks.length / pageViews.length) * 100).toFixed(2) : 0,
          clicksByButton,
          viewsByPage,
          viewsByDay,
          viewsByHour,
          utmSources,
          recentVisits,
          mouseMovements: mouseMovements.map((m) => ({
            x: m.x_position,
            y: m.y_position,
            page_path: m.page_path,
          })),
          buttonClicks: buttonClicks.map((c) => ({
            x: c.click_x,
            y: c.click_y,
            page_path: c.page_path,
            viewport_width: c.viewport_width,
            viewport_height: c.viewport_height,
          })),
          // Geography data
          viewsByCountry,
          viewsByRegion,
          viewsByCity,
          countryCodes,
          // Online data
          onlineNow,
          onlineDetails,
          // Time on page data
          avgTimeOnPage,
          avgTimeByPage,
          // Device data
          viewsByDevice,
          // Bounce rate data
          bounceRate,
          bounceRateByPage,
          // Scroll depth data
          avgScrollDepth,
          scrollDepthByPage,
          scrollFunnel,
          // Engagement data
          engagementScore,
          avgInteractionCount,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analytics data error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
