import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    const { password, fileName, fileType, fileData } = await req.json();

    // Verify admin password
    if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!fileName || !fileType || !fileData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract base64 data (remove data URL prefix if present)
    const base64Content = fileData.includes(",")
      ? fileData.split(",")[1]
      : fileData;

    // Convert base64 to Uint8Array
    const binaryData = Uint8Array.from(atob(base64Content), (c) => c.charCodeAt(0));

    // Generate unique file name
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
    const uniqueFileName = `${timestamp}-${sanitizedName}`;

    console.log(`Uploading file: ${uniqueFileName}, type: ${fileType}, size: ${binaryData.length} bytes`);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("article-images")
      .upload(uniqueFileName, binaryData, {
        contentType: fileType,
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      throw error;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("article-images")
      .getPublicUrl(data.path);

    console.log(`File uploaded successfully: ${publicUrlData.publicUrl}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: publicUrlData.publicUrl,
        path: data.path 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
