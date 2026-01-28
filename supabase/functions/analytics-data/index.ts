import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple password validation
const ANALYTICS_PASSWORD = "Dhsc9205@";

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

    // Visits today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const visitsToday = pageViews.filter(
      (pv) => new Date(pv.created_at) >= today
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

    // Views by hour
    const viewsByHour: Record<number, number> = {};
    pageViews.forEach((pv) => {
      const hour = new Date(pv.created_at).getHours();
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
          // New geography data
          viewsByCountry,
          viewsByRegion,
          viewsByCity,
          countryCodes,
          // Online data
          onlineNow,
          onlineDetails,
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
