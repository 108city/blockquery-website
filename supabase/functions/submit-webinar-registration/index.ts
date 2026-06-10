import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';
import { corsHeaders } from '../_shared/cors.ts';

const RECAPTCHA_SECRET_KEY = Deno.env.get('RECAPTCHA_SECRET_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface WebinarRegistrationData {
  name: string;
  company: string;
  email: string;
  webinarSlug: string;
  recaptchaToken?: string;
}

const validateRegistration = (data: WebinarRegistrationData): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  // Validate company
  if (!data.company || data.company.trim().length === 0) {
    errors.company = 'Company is required';
  } else if (data.company.trim().length > 200) {
    errors.company = 'Company must be less than 200 characters';
  }

  // Validate email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Invalid email address';
  } else if (data.email.trim().length > 255) {
    errors.email = 'Email must be less than 255 characters';
  }

  // Validate webinar slug
  if (!data.webinarSlug || data.webinarSlug.trim().length === 0) {
    errors.webinarSlug = 'Webinar slug is required';
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const data: WebinarRegistrationData = await req.json();
    console.log('Received webinar registration submission:', { 
      email: data.email,
      webinarSlug: data.webinarSlug 
    });

    // Validate input data
    const validation = validateRegistration(data);
    if (!validation.valid) {
      console.error('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          fields: validation.errors 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify reCAPTCHA if token provided
    if (data.recaptchaToken && RECAPTCHA_SECRET_KEY) {
      console.log('Verifying reCAPTCHA token');
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`,
      });

      const recaptchaResult = await recaptchaResponse.json();
      if (!recaptchaResult.success) {
        console.error('reCAPTCHA verification failed:', recaptchaResult);
        return new Response(
          JSON.stringify({ error: 'reCAPTCHA verification failed' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      console.log('reCAPTCHA verified successfully');
    }

    // Check for duplicate registration
    const { data: existingRegistration, error: checkError } = await supabase
      .from('webinar_registrations')
      .select('id')
      .eq('email', data.email.trim().toLowerCase())
      .eq('webinar_slug', data.webinarSlug.trim())
      .maybeSingle();

    if (checkError) {
      console.error('Error checking for duplicate registration:', checkError);
      return new Response(
        JSON.stringify({ error: 'Failed to check registration status' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (existingRegistration) {
      console.log('Duplicate registration detected for email:', data.email);
      return new Response(
        JSON.stringify({ error: 'You have already registered for this webinar' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    // Clean up old rate limit entries
    await supabase
      .from('rate_limits')
      .delete()
      .eq('endpoint', 'webinar_registration')
      .lt('window_start', oneHourAgo);

    // Check current rate limit
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('rate_limits')
      .select('request_count')
      .eq('ip_address', clientIp)
      .eq('endpoint', 'webinar_registration')
      .gte('window_start', oneHourAgo)
      .maybeSingle();

    if (rateLimitError) {
      console.error('Error checking rate limit:', rateLimitError);
    }

    if (rateLimitData && rateLimitData.request_count >= 3) {
      console.log('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ error: 'Too many registration attempts. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Update or create rate limit entry
    if (rateLimitData) {
      await supabase
        .from('rate_limits')
        .update({ request_count: rateLimitData.request_count + 1 })
        .eq('ip_address', clientIp)
        .eq('endpoint', 'webinar_registration');
    } else {
      await supabase
        .from('rate_limits')
        .insert({
          ip_address: clientIp,
          endpoint: 'webinar_registration',
          request_count: 1,
        });
    }

    // Insert registration
    const { error: insertError } = await supabase
      .from('webinar_registrations')
      .insert({
        name: data.name.trim(),
        company: data.company.trim(),
        email: data.email.trim().toLowerCase(),
        webinar_slug: data.webinarSlug.trim(),
        status: 'pending',
      });

    if (insertError) {
      console.error('Error inserting webinar registration:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to submit registration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Webinar registration submitted successfully:', data.email);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Registration submitted successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in submit-webinar-registration function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
