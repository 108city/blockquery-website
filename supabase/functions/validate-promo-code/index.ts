import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ValidatePromoRequest {
  code: string;
}

interface ValidatePromoResponse {
  valid: boolean;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  message?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rawData = await req.json();
    
    // Validate input
    const promoSchema = z.object({
      code: z.string().trim().min(1).max(50),
    });
    
    const validationResult = promoSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.log('Invalid promo code format');
      return new Response(
        JSON.stringify({
          valid: false,
          message: 'Please enter a valid promo code',
        } as ValidatePromoResponse),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const { code } = validationResult.data;
    console.log('Validating promo code');

    if (code.trim() === '') {
      return new Response(
        JSON.stringify({
          valid: false,
          message: 'Please enter a promo code',
        } as ValidatePromoResponse),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch promo code from database (case-insensitive)
    const { data: promoCode, error: fetchError } = await supabase
      .from('promo_codes')
      .select('*')
      .ilike('code', code.trim())
      .single();

    if (fetchError || !promoCode) {
      console.log('Promo code not found');
      return new Response(
        JSON.stringify({
          valid: false,
          message: 'Invalid promo code',
        } as ValidatePromoResponse),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check if code is active
    if (!promoCode.active) {
      console.log('Promo code is inactive');
      return new Response(
        JSON.stringify({
          valid: false,
          message: 'This promo code is not active',
        } as ValidatePromoResponse),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check validity dates
    const now = new Date();
    const validFrom = new Date(promoCode.valid_from);
    const validUntil = new Date(promoCode.valid_until);

    if (now < validFrom) {
      console.log('Promo code not yet valid');
      return new Response(
        JSON.stringify({
          valid: false,
          message: 'This promo code is not yet valid',
        } as ValidatePromoResponse),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (now > validUntil) {
      console.log('Promo code has expired');
      return new Response(
        JSON.stringify({
          valid: false,
          message: 'This promo code has expired',
        } as ValidatePromoResponse),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check usage limits (if max_uses is set)
    if (promoCode.max_uses !== null && promoCode.current_uses >= promoCode.max_uses) {
      console.log('Promo code max uses reached');
      return new Response(
        JSON.stringify({
          valid: false,
          message: 'This promo code is no longer available',
        } as ValidatePromoResponse),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Promo code is valid
    console.log('Promo code validated successfully');

    return new Response(
      JSON.stringify({
        valid: true,
        discountType: promoCode.discount_type,
        discountValue: promoCode.discount_value,
        message: 'Promo code applied successfully',
      } as ValidatePromoResponse),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.log('Error validating promo code');
    return new Response(
      JSON.stringify({
        valid: false,
        message: 'Unable to validate promo code. Please try again.',
      } as ValidatePromoResponse),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
