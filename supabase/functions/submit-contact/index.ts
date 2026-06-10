import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Persistent rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Max 3 submissions per minute per IP

interface ContactSubmission {
  fullName: string;
  organization: string;
  email: string;
  country: string;
  areaOfExpertise: string;
  message: string;
  attachmentUrl?: string | null;
  honeypot?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

async function checkRateLimit(
  supabase: any,
  ip: string,
  endpoint: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

  try {
    // Try to get existing rate limit record
    const { data: existing } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('ip_address', ip)
      .eq('endpoint', endpoint)
      .single();

    if (!existing || new Date(existing.window_start) < windowStart) {
      // Create new window or reset expired one
      await supabase
        .from('rate_limits')
        .upsert({
          ip_address: ip,
          endpoint: endpoint,
          request_count: 1,
          window_start: now,
        }, {
          onConflict: 'ip_address,endpoint'
        });
      return { allowed: true };
    }

    // Check if limit exceeded
    if (existing.request_count >= MAX_SUBMISSIONS_PER_WINDOW) {
      const windowEnd = new Date(new Date(existing.window_start).getTime() + RATE_LIMIT_WINDOW_MS);
      const retryAfter = Math.ceil((windowEnd.getTime() - now.getTime()) / 1000);
      return { allowed: false, retryAfter };
    }

    // Increment counter
    await supabase
      .from('rate_limits')
      .update({ request_count: existing.request_count + 1 })
      .eq('ip_address', ip)
      .eq('endpoint', endpoint);

    return { allowed: true };
  } catch (error) {
    console.log('Rate limit check failed, allowing request');
    // On error, allow the request to avoid blocking legitimate users
    return { allowed: true };
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client first for rate limiting
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log('Contact form submission received');

    // Check rate limit with persistent storage
    const rateCheck = await checkRateLimit(supabaseAdmin, clientIp, 'contact_form');
    if (!rateCheck.allowed) {
      console.log('Rate limit exceeded for contact form');
      return new Response(
        JSON.stringify({ 
          error: 'Too many submissions. Please try again later.',
          retryAfter: rateCheck.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateCheck.retryAfter)
          } 
        }
      );
    }

    // Parse request body
    const submission: ContactSubmission = await req.json();

    // Check honeypot field (if present and filled, it's a bot)
    if (submission.honeypot && submission.honeypot.trim() !== '') {
      console.log('Bot detected via honeypot');
      // Return success to fool the bot
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { fullName, organization, email, country, areaOfExpertise, message, attachmentUrl } = submission;

    if (!fullName || !organization || !email || !country || !areaOfExpertise || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (fullName.trim().length > 100 || fullName.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Full name must be between 1 and 100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (organization.trim().length > 200 || organization.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Organization must be between 1 and 200 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (message.trim().length > 2000 || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message must be between 1 and 2000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!validateEmail(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const insertData: Record<string, unknown> = {
      full_name: fullName.trim(),
      organization: organization.trim(),
      email: email.trim().toLowerCase(),
      country,
      area_of_expertise: areaOfExpertise,
      message: message.trim(),
    };
    if (attachmentUrl && typeof attachmentUrl === 'string' && attachmentUrl.length < 500) {
      insertData.attachment_url = attachmentUrl;
    }

    const { error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert(insertData);

    if (dbError) {
      console.log('Database error during contact form submission');
      return new Response(
        JSON.stringify({ error: 'Unable to submit form. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Contact form submitted successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.log('Error processing contact form');
    return new Response(
      JSON.stringify({ error: 'Unable to process your request. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
