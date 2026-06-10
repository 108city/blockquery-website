import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting helper
async function checkRateLimit(supabase: SupabaseClient, ip: string): Promise<boolean> {
  const endpoint = 'mollie-webhook';
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 30; // Max 30 requests per minute

  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMs);

  // Try to get existing rate limit record
  const { data: existing } = await supabase
    .from('rate_limits')
    .select('id, request_count')
    .eq('ip_address', ip)
    .eq('endpoint', endpoint)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (existing) {
    const record = existing as { id: string; request_count: number };
    if (record.request_count >= maxRequests) {
      return false; // Rate limited
    }
    // Increment count
    await supabase
      .from('rate_limits')
      .update({ request_count: record.request_count + 1 })
      .eq('id', record.id);
  } else {
    // Create new record
    await supabase
      .from('rate_limits')
      .insert({
        ip_address: ip,
        endpoint,
        window_start: now.toISOString(),
        request_count: 1,
      });
  }

  return true;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const mollieApiKey = Deno.env.get('MOLLIE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';

    // Check rate limit
    const allowed = await checkRateLimit(supabase, clientIp);
    if (!allowed) {
      console.error('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get payment ID from form-encoded request body
    const formData = await req.formData();
    const paymentId = formData.get('id');
    
    console.log('Received webhook for payment:', paymentId);

    if (!paymentId) {
      console.error('No payment ID provided in webhook');
      return new Response(
        JSON.stringify({ error: 'No payment ID provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate payment ID format (Mollie payment IDs start with 'tr_')
    const paymentIdStr = String(paymentId);
    if (!paymentIdStr.startsWith('tr_') || paymentIdStr.length < 10 || paymentIdStr.length > 50) {
      console.error('Invalid payment ID format:', paymentIdStr);
      return new Response(
        JSON.stringify({ error: 'Invalid payment ID format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch payment details from Mollie to verify
    // This is the primary security check - only Mollie knows valid payment IDs
    const mollieResponse = await fetch(`https://api.mollie.com/v2/payments/${paymentIdStr}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${mollieApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!mollieResponse.ok) {
      console.error('Failed to fetch payment from Mollie:', await mollieResponse.text());
      return new Response(
        JSON.stringify({ error: 'Failed to verify payment with Mollie' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const paymentData = await mollieResponse.json();
    
    console.log('Mollie payment status:', paymentData.status);
    console.log('Payment metadata:', paymentData.metadata);

    // Extract report ID from metadata
    const reportId = paymentData.metadata?.reportId;

    if (!reportId) {
      console.error('No report ID in payment metadata');
      return new Response(
        JSON.stringify({ error: 'No report ID in payment metadata' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate report ID format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(reportId)) {
      console.error('Invalid report ID format:', reportId);
      return new Response(
        JSON.stringify({ error: 'Invalid report ID format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Update database based on payment status
    if (paymentData.status === 'paid') {
      console.log('Payment successful, updating report:', reportId);

      const { error: updateError } = await supabase
        .from('self_service_reports')
        .update({ 
          payment_completed: true,
        })
        .eq('id', reportId);

      if (updateError) {
        console.error('Failed to update report:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update report' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      console.log('Report updated successfully');

      // TODO: Send confirmation email to user
      // This can be implemented later using Resend or another email service

    } else if (paymentData.status === 'failed' || paymentData.status === 'canceled' || paymentData.status === 'expired') {
      console.log('Payment failed/canceled/expired:', paymentData.status);
      
      // Optionally update the report or send notification
      // For now, we'll just log it
    }

    return new Response(
      JSON.stringify({ success: true, status: paymentData.status }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
