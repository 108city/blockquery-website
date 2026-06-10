import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_PRICE = 99;

// Relaxed validation schema - normalize on server
const reportSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phoneNumber: z.string().trim().min(7, "Phone number must be at least 7 digits").max(50),
  countryCode: z.string().max(10).optional().or(z.literal('')).nullable(),
  country: z.string().min(1, "Country is required").max(100),
  scamType: z.string().max(100).optional().or(z.literal('')).nullable(),
  incidentDate: z.string().datetime("Invalid date format"),
  amountLostUsd: z.number().positive("Amount must be positive").max(1000000000, "Amount too large"),
  transactionId: z.string().trim().min(1, "Transaction ID is required").max(200, "Transaction ID must be less than 200 characters"),
  walletType: z.string().max(50).optional().or(z.literal('')).nullable(),
  hasWalletAccess: z.boolean(),
  companyName: z.string().max(200).optional().or(z.literal('')).nullable(),
  incidentDetails: z.string().trim().min(20, "Please provide at least 20 characters").max(5000, "Details must be less than 5000 characters"),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification required"),
  promoCode: z.string().max(50).optional().or(z.literal('')).nullable(),
});

interface ReportSubmission {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  countryCode?: string | null;
  country: string;
  scamType?: string | null;
  incidentDate: string;
  amountLostUsd: number;
  transactionId: string;
  walletType?: string | null;
  hasWalletAccess: boolean;
  companyName?: string | null;
  incidentDetails: string;
  recaptchaToken: string;
  promoCode?: string | null;
}

// Normalize phone number to E.164 format
function normalizePhoneNumber(phone: string | null | undefined, countryCode: string | null | undefined): string | null {
  if (!phone || !phone.trim()) return null;
  
  // Strip all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's within valid E.164 range (7-15 digits)
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    console.log(`Phone number ${phone} has invalid length after normalization: ${digitsOnly.length} digits`);
    return null;
  }
  
  // If starts with +, assume it's already formatted
  if (phone.trim().startsWith('+')) {
    return `+${digitsOnly}`;
  }
  
  // Otherwise, prefix with country code if available
  if (countryCode) {
    const codeDigits = countryCode.replace(/\D/g, '');
    return `+${codeDigits}${digitsOnly}`;
  }
  
  // Default: prefix with +
  return `+${digitsOnly}`;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Self-Service Report Submission Started ===');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const recaptchaSecretKey = Deno.env.get('RECAPTCHA_SECRET_KEY')!;
    const mollieApiKey = Deno.env.get('MOLLIE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rawData = await req.json();
    console.log('Received submission for email:', rawData.email);
    
    // Validate input data with Zod
    const validationResult = reportSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      console.log('Validation failed:', validationResult.error.errors);
      
      return new Response(
        JSON.stringify({ 
          error: firstError.message || 'Invalid input data. Please check your form and try again.',
          field: firstError.path[0] || undefined,
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const data: ReportSubmission = validationResult.data as ReportSubmission;

    // Verify reCAPTCHA
    console.log('Verifying reCAPTCHA...');
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecretKey}&response=${data.recaptchaToken}`,
    });

    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      console.log('reCAPTCHA verification failed:', recaptchaResult);
      return new Response(
        JSON.stringify({ error: 'reCAPTCHA verification failed. Please try again.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('reCAPTCHA verified successfully');

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(data.phoneNumber, data.countryCode);
    console.log('Phone normalized:', data.phoneNumber, '->', normalizedPhone);

    // Server-side promo code validation and price calculation
    let finalPrice = BASE_PRICE;
    let discountAmount = 0;
    let validatedPromoCode: string | null = null;

    if (data.promoCode && data.promoCode.trim()) {
      console.log('Validating promo code:', data.promoCode);
      
      const { data: promoData, error: promoError } = await supabase
        .from('promo_codes')
        .select('*')
        .ilike('code', data.promoCode.trim())
        .single();

      if (promoError || !promoData) {
        console.log('Promo code not found:', data.promoCode);
        return new Response(
          JSON.stringify({ 
            error: 'Invalid promo code',
            field: 'promoCode',
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Validate promo code conditions
      const now = new Date();
      const validFrom = new Date(promoData.valid_from);
      const validUntil = new Date(promoData.valid_until);

      if (!promoData.active) {
        console.log('Promo code inactive:', data.promoCode);
        return new Response(
          JSON.stringify({ 
            error: 'This promo code is no longer active',
            field: 'promoCode',
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (now < validFrom) {
        console.log('Promo code not yet valid:', data.promoCode);
        return new Response(
          JSON.stringify({ 
            error: 'This promo code is not yet valid',
            field: 'promoCode',
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (now > validUntil) {
        console.log('Promo code expired:', data.promoCode);
        return new Response(
          JSON.stringify({ 
            error: 'This promo code has expired',
            field: 'promoCode',
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (promoData.max_uses !== null && promoData.current_uses >= promoData.max_uses) {
        console.log('Promo code max uses reached:', data.promoCode);
        return new Response(
          JSON.stringify({ 
            error: 'This promo code has reached its maximum usage limit',
            field: 'promoCode',
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Calculate discount
      if (promoData.discount_type === 'percentage') {
        discountAmount = (BASE_PRICE * promoData.discount_value) / 100;
      } else if (promoData.discount_type === 'fixed') {
        discountAmount = promoData.discount_value;
      }

      finalPrice = Math.max(0, BASE_PRICE - discountAmount);
      validatedPromoCode = promoData.code;
      
      console.log(`Promo applied: ${validatedPromoCode}, discount: ${discountAmount}, final price: ${finalPrice}`);

      // Increment usage counter
      const { error: incrementError } = await supabase
        .from('promo_codes')
        .update({ current_uses: promoData.current_uses + 1 })
        .eq('id', promoData.id);

      if (incrementError) {
        console.log('Failed to increment promo usage (non-critical):', incrementError);
      }
    }

    // Insert report into database
    console.log('Inserting report into database...');
    const { data: reportData, error: dbError } = await supabase
      .from('self_service_reports')
      .insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone_number: normalizedPhone,
          country_code: data.countryCode || null,
          country: data.country,
          scam_type: data.scamType || null,
          incident_date: data.incidentDate,
          amount_lost_usd: data.amountLostUsd,
          transaction_id: data.transactionId,
          wallet_type: data.walletType || null,
          has_wallet_access: data.hasWalletAccess,
          company_name: data.companyName || null,
          incident_details: data.incidentDetails,
          payment_completed: false,
          promo_code_used: validatedPromoCode,
          discount_amount: discountAmount,
          final_price: finalPrice,
          payment_link: null,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Unable to process your request. Please try again.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Report created with ID:', reportData.id);

    // Create Mollie payment
    const paymentDescription = validatedPromoCode 
      ? `Self-Service Report - Promo ${validatedPromoCode}` 
      : 'Self-Service Crypto Investigation Report';

    const origin = req.headers.get('origin') || 'https://db608c80-7ab2-45b1-9c2b-cd7ded403208.lovableproject.com';
    
    const molliePaymentPayload = {
      amount: {
        value: finalPrice.toFixed(2),
        currency: 'USD',
      },
      description: paymentDescription,
      redirectUrl: `${origin}/thank-you?reportId=${reportData.id}`,
      webhookUrl: `${supabaseUrl}/functions/v1/mollie-webhook`,
      metadata: {
        reportId: reportData.id,
        promoCode: validatedPromoCode || null,
      },
    };

    console.log('Creating Mollie payment with payload:', JSON.stringify(molliePaymentPayload, null, 2));

    const mollieResponse = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mollieApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(molliePaymentPayload),
    });

    if (!mollieResponse.ok) {
      const errorText = await mollieResponse.text();
      console.error('Mollie payment creation failed:', mollieResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Unable to create payment link. Please try again.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const molliePayment = await mollieResponse.json();
    const paymentLink = molliePayment._links?.checkout?.href;

    if (!paymentLink) {
      console.error('No payment link in Mollie response');
      return new Response(
        JSON.stringify({ error: 'Unable to generate payment link. Please try again.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Mollie payment created successfully');

    // Update report with payment link
    const { error: updateError } = await supabase
      .from('self_service_reports')
      .update({ payment_link: paymentLink })
      .eq('id', reportData.id);

    if (updateError) {
      console.error('Failed to update payment link:', updateError);
    }

    console.log('=== Submission Complete ===');

    return new Response(
      JSON.stringify({ 
        success: true, 
        reportId: reportData.id,
        paymentLink: paymentLink,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Unable to process your request. Please try again.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
