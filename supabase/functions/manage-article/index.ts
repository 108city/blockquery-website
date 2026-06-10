import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, password, article, id } = await req.json();

    // Verify admin password for all operations except public 'get' (single published article)
    if (action !== "get") {
      if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    switch (action) {
      case "create": {
        const slug = article.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        const { data, error } = await supabase
          .from("articles")
          .insert({
            title: article.title,
            slug: slug + "-" + Date.now(),
            excerpt: article.excerpt,
            content: article.content,
            cover_image_url: article.cover_image_url,
            author_name: article.author_name || "Blockquery",
            published: article.published || false,
            published_at: article.published ? new Date().toISOString() : null,
          })
          .select()
          .single();

        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, article: data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update": {
        const updateData: Record<string, unknown> = { ...article };
        if (article.published && !article.published_at) {
          updateData.published_at = new Date().toISOString();
        }
        
        const { data, error } = await supabase
          .from("articles")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, article: data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "delete": {
        const { error } = await supabase
          .from("articles")
          .delete()
          .eq("id", id);

        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "list": {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return new Response(
          JSON.stringify({ articles: data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "get": {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", id)
          .single();

        if (error) throw error;
        return new Response(
          JSON.stringify({ article: data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});