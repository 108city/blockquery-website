import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield,
  CheckCircle2,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Check,
  Tag,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────

const countryCodes = [
  { code: "+93", country: "Afghanistan" },
  { code: "+355", country: "Albania" },
  { code: "+213", country: "Algeria" },
  { code: "+376", country: "Andorra" },
  { code: "+244", country: "Angola" },
  { code: "+54", country: "Argentina" },
  { code: "+374", country: "Armenia" },
  { code: "+61", country: "Australia" },
  { code: "+43", country: "Austria" },
  { code: "+994", country: "Azerbaijan" },
  { code: "+973", country: "Bahrain" },
  { code: "+880", country: "Bangladesh" },
  { code: "+375", country: "Belarus" },
  { code: "+32", country: "Belgium" },
  { code: "+501", country: "Belize" },
  { code: "+229", country: "Benin" },
  { code: "+975", country: "Bhutan" },
  { code: "+591", country: "Bolivia" },
  { code: "+387", country: "Bosnia and Herzegovina" },
  { code: "+267", country: "Botswana" },
  { code: "+55", country: "Brazil" },
  { code: "+673", country: "Brunei" },
  { code: "+359", country: "Bulgaria" },
  { code: "+226", country: "Burkina Faso" },
  { code: "+257", country: "Burundi" },
  { code: "+855", country: "Cambodia" },
  { code: "+237", country: "Cameroon" },
  { code: "+1", country: "Canada" },
  { code: "+238", country: "Cape Verde" },
  { code: "+236", country: "Central African Republic" },
  { code: "+235", country: "Chad" },
  { code: "+56", country: "Chile" },
  { code: "+86", country: "China" },
  { code: "+57", country: "Colombia" },
  { code: "+269", country: "Comoros" },
  { code: "+242", country: "Congo" },
  { code: "+506", country: "Costa Rica" },
  { code: "+385", country: "Croatia" },
  { code: "+53", country: "Cuba" },
  { code: "+357", country: "Cyprus" },
  { code: "+420", country: "Czech Republic" },
  { code: "+45", country: "Denmark" },
  { code: "+253", country: "Djibouti" },
  { code: "+593", country: "Ecuador" },
  { code: "+20", country: "Egypt" },
  { code: "+503", country: "El Salvador" },
  { code: "+240", country: "Equatorial Guinea" },
  { code: "+291", country: "Eritrea" },
  { code: "+372", country: "Estonia" },
  { code: "+251", country: "Ethiopia" },
  { code: "+679", country: "Fiji" },
  { code: "+358", country: "Finland" },
  { code: "+33", country: "France" },
  { code: "+241", country: "Gabon" },
  { code: "+220", country: "Gambia" },
  { code: "+995", country: "Georgia" },
  { code: "+49", country: "Germany" },
  { code: "+233", country: "Ghana" },
  { code: "+30", country: "Greece" },
  { code: "+502", country: "Guatemala" },
  { code: "+224", country: "Guinea" },
  { code: "+245", country: "Guinea-Bissau" },
  { code: "+592", country: "Guyana" },
  { code: "+509", country: "Haiti" },
  { code: "+504", country: "Honduras" },
  { code: "+852", country: "Hong Kong" },
  { code: "+36", country: "Hungary" },
  { code: "+354", country: "Iceland" },
  { code: "+91", country: "India" },
  { code: "+62", country: "Indonesia" },
  { code: "+98", country: "Iran" },
  { code: "+964", country: "Iraq" },
  { code: "+353", country: "Ireland" },
  { code: "+972", country: "Israel" },
  { code: "+39", country: "Italy" },
  { code: "+225", country: "Ivory Coast" },
  { code: "+81", country: "Japan" },
  { code: "+962", country: "Jordan" },
  { code: "+7", country: "Kazakhstan" },
  { code: "+254", country: "Kenya" },
  { code: "+965", country: "Kuwait" },
  { code: "+996", country: "Kyrgyzstan" },
  { code: "+856", country: "Laos" },
  { code: "+371", country: "Latvia" },
  { code: "+961", country: "Lebanon" },
  { code: "+266", country: "Lesotho" },
  { code: "+231", country: "Liberia" },
  { code: "+218", country: "Libya" },
  { code: "+423", country: "Liechtenstein" },
  { code: "+370", country: "Lithuania" },
  { code: "+352", country: "Luxembourg" },
  { code: "+853", country: "Macau" },
  { code: "+389", country: "North Macedonia" },
  { code: "+261", country: "Madagascar" },
  { code: "+265", country: "Malawi" },
  { code: "+60", country: "Malaysia" },
  { code: "+960", country: "Maldives" },
  { code: "+223", country: "Mali" },
  { code: "+356", country: "Malta" },
  { code: "+222", country: "Mauritania" },
  { code: "+230", country: "Mauritius" },
  { code: "+52", country: "Mexico" },
  { code: "+373", country: "Moldova" },
  { code: "+377", country: "Monaco" },
  { code: "+976", country: "Mongolia" },
  { code: "+382", country: "Montenegro" },
  { code: "+212", country: "Morocco" },
  { code: "+258", country: "Mozambique" },
  { code: "+95", country: "Myanmar" },
  { code: "+264", country: "Namibia" },
  { code: "+977", country: "Nepal" },
  { code: "+31", country: "Netherlands" },
  { code: "+64", country: "New Zealand" },
  { code: "+505", country: "Nicaragua" },
  { code: "+227", country: "Niger" },
  { code: "+234", country: "Nigeria" },
  { code: "+47", country: "Norway" },
  { code: "+968", country: "Oman" },
  { code: "+92", country: "Pakistan" },
  { code: "+970", country: "Palestine" },
  { code: "+507", country: "Panama" },
  { code: "+675", country: "Papua New Guinea" },
  { code: "+595", country: "Paraguay" },
  { code: "+51", country: "Peru" },
  { code: "+63", country: "Philippines" },
  { code: "+48", country: "Poland" },
  { code: "+351", country: "Portugal" },
  { code: "+974", country: "Qatar" },
  { code: "+40", country: "Romania" },
  { code: "+7", country: "Russia" },
  { code: "+250", country: "Rwanda" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+221", country: "Senegal" },
  { code: "+381", country: "Serbia" },
  { code: "+248", country: "Seychelles" },
  { code: "+232", country: "Sierra Leone" },
  { code: "+65", country: "Singapore" },
  { code: "+421", country: "Slovakia" },
  { code: "+386", country: "Slovenia" },
  { code: "+252", country: "Somalia" },
  { code: "+27", country: "South Africa" },
  { code: "+82", country: "South Korea" },
  { code: "+211", country: "South Sudan" },
  { code: "+34", country: "Spain" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+249", country: "Sudan" },
  { code: "+597", country: "Suriname" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+963", country: "Syria" },
  { code: "+886", country: "Taiwan" },
  { code: "+992", country: "Tajikistan" },
  { code: "+255", country: "Tanzania" },
  { code: "+66", country: "Thailand" },
  { code: "+228", country: "Togo" },
  { code: "+216", country: "Tunisia" },
  { code: "+90", country: "Turkey" },
  { code: "+993", country: "Turkmenistan" },
  { code: "+256", country: "Uganda" },
  { code: "+380", country: "Ukraine" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+44", country: "United Kingdom" },
  { code: "+1", country: "United States" },
  { code: "+598", country: "Uruguay" },
  { code: "+998", country: "Uzbekistan" },
  { code: "+58", country: "Venezuela" },
  { code: "+84", country: "Vietnam" },
  { code: "+967", country: "Yemen" },
  { code: "+260", country: "Zambia" },
  { code: "+263", country: "Zimbabwe" },
].sort((a, b) => a.country.localeCompare(b.country));

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const scamTypes = [
  "Phishing", "Investment Scam", "Romance Scam", "Impersonation",
  "Fake Exchange", "Rug Pull", "Ponzi Scheme", "Other",
];

const walletTypes = [
  "Hardware Wallet", "Software Wallet", "Exchange Wallet",
  "Web Wallet", "Mobile Wallet", "Paper Wallet", "Other",
];

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Belize","Benin",
  "Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon",
  "Gambia","Georgia","Germany","Ghana","Greece","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia",
  "Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Japan","Jordan","Kazakhstan",
  "Kenya","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya",
  "Liechtenstein","Lithuania","Luxembourg","Macau","North Macedonia","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal",
  "Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan",
  "Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland",
  "Portugal","Qatar","Romania","Russia","Rwanda","Saudi Arabia","Senegal","Serbia",
  "Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tunisia","Turkey",
  "Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

// ── Schema ────────────────────────────────────────────

const reportSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phoneNumber: z.string().trim().min(7, "Phone number must be at least 7 digits").max(20, "Phone number is too long"),
  countryCode: z.string().optional(),
  country: z.string().min(1, "Please select your country of residence"),
  scamType: z.string().optional(),
  incidentDate: z.date({ required_error: "Please select when the incident occurred" }),
  amountLostUsd: z.string().min(1, "Please enter the amount lost").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a valid positive number",
  }),
  transactionId: z.string().trim().min(1, "Transaction ID/Address is required").max(200),
  walletType: z.string().optional(),
  hasWalletAccess: z.boolean().default(false),
  companyName: z.string().trim().optional(),
  incidentDetails: z.string().trim().min(20, "Please provide at least 20 characters").max(2000),
});

type ReportFormData = z.infer<typeof reportSchema>;

// ── Component ─────────────────────────────────────────

const Investigations = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
  } | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [countryCodeOpen, setCountryCodeOpen] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const BASE_PRICE = 99;
  const ORIGINAL_PRICE = 249;

  const calculatePrice = () => {
    if (!appliedPromo) return BASE_PRICE;
    if (appliedPromo.discountType === "percentage") {
      return Math.max(0, BASE_PRICE - (BASE_PRICE * appliedPromo.discountValue) / 100);
    }
    return Math.max(0, BASE_PRICE - appliedPromo.discountValue);
  };

  const finalPrice = calculatePrice();
  const discountAmount = BASE_PRICE - finalPrice;

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCode: "+1",
      country: "",
      scamType: "",
      incidentDate: undefined,
      amountLostUsd: "",
      transactionId: "",
      walletType: "",
      hasWalletAccess: false,
      companyName: "",
      incidentDetails: "",
    },
  });

  const totalSteps = 3;

  const nextStep = async () => {
    let fieldsToValidate: (keyof ReportFormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ["fullName", "email", "country"];
    else if (currentStep === 2) fieldsToValidate = ["incidentDate", "amountLostUsd", "transactionId"];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    setIsValidatingPromo(true);
    setPromoError(null);
    try {
      const { data, error } = await supabase.functions.invoke("validate-promo-code", {
        body: { code: promoCode.trim() },
      });
      if (error) {
        setPromoError("Failed to validate promo code. Please try again.");
        setIsValidatingPromo(false);
        return;
      }
      if (data.valid) {
        setAppliedPromo({ code: promoCode.trim(), discountType: data.discountType, discountValue: data.discountValue });
        toast({ title: "Promo Code Applied!", description: data.message || "Discount has been applied to your order." });
        setPromoError(null);
      } else {
        setPromoError(data.message || "Invalid promo code");
        setAppliedPromo(null);
      }
    } catch {
      setPromoError("An error occurred. Please try again.");
      setAppliedPromo(null);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError(null);
    setShowPromoInput(false);
  };

  const onSubmit = async (data: ReportFormData) => {
    if (!recaptchaValue) {
      toast({ title: "Verification Required", description: "Please complete the reCAPTCHA verification.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      let normalizedPhone: string | undefined;
      if (data.phoneNumber?.trim()) {
        const digitsOnly = data.phoneNumber.replace(/\D/g, "");
        if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
          normalizedPhone = data.countryCode ? `${data.countryCode}${digitsOnly}` : `+${digitsOnly}`;
        }
      }
      const { data: functionData, error } = await supabase.functions.invoke("submit-self-service-report", {
        body: {
          fullName: data.fullName, email: data.email, phoneNumber: normalizedPhone,
          countryCode: data.countryCode, country: data.country, scamType: data.scamType,
          incidentDate: data.incidentDate.toISOString(), amountLostUsd: parseFloat(data.amountLostUsd),
          transactionId: data.transactionId, walletType: data.walletType,
          hasWalletAccess: data.hasWalletAccess, companyName: data.companyName,
          incidentDetails: data.incidentDetails, recaptchaToken: recaptchaValue,
          promoCode: appliedPromo?.code,
        },
      });
      if (error) {
        let errorMessage = "There was an error submitting your report. Please try again.";
        let errorField: string | undefined;
        try { const p = JSON.parse(error.message); errorMessage = p.error || errorMessage; errorField = p.field; } catch {}
        toast({ title: "Submission Failed", description: errorMessage, variant: "destructive" });
        if (errorField && errorField in data) form.setError(errorField as keyof ReportFormData, { type: "server", message: errorMessage });
        recaptchaRef.current?.reset();
        setRecaptchaValue(null);
        setIsSubmitting(false);
        return;
      }
      if (functionData?.paymentLink) {
        window.location.href = functionData.paymentLink;
      } else {
        toast({ title: "Error", description: "Failed to generate payment link. Please contact support.", variant: "destructive" });
        setIsSubmitting(false);
      }
    } catch {
      toast({ title: "Error", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Render ────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Get a professional crypto investigation report
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Understand what happened to your crypto. Receive a detailed investigation report mapping wallet activity, fund flows and potential recovery paths.
          </p>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Pricing Card */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-card border border-border rounded-xl p-8 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-center tracking-wide uppercase mb-6">
              Personal Crypto Report
            </h2>

            {/* Price */}
            <div className="text-center mb-8">
              <span className="text-lg text-muted-foreground line-through mr-2">${ORIGINAL_PRICE}</span>
              <span className="text-5xl sm:text-6xl font-bold text-primary">${BASE_PRICE}</span>
              <p className="text-sm text-muted-foreground mt-2">Delivered within 48H</p>
            </div>

            {/* What you'll receive */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">What you'll receive:</h3>
              <ul className="space-y-3">
                {[
                  "A clear breakdown of how your crypto moved after the scam",
                  "A visual flow diagram showing wallet connections and key movements",
                  "A structured transaction list you can use for legal or exchange submissions",
                  "A realistic assessment of recovery feasibility",
                  "Written next steps tailored to your case",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* This report can help you */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">This report can help you:</h3>
              <ul className="space-y-3">
                {[
                  "Decide whether further investigation is worth it",
                  "Present structured evidence to exchanges",
                  "Understand if recovery claims made by others are realistic",
                  "Avoid spending thousands unnecessarily",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button size="lg" className="font-semibold px-10" onClick={scrollToForm}>
                Start Investigation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Begin Your Investigation */}
      <section ref={formSectionRef} className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Begin your investigation</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
              Your own step away from receiving a structured forensic analysis of your lost crypto.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Fixed fee</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Delivered within 48 hours</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Strictly confidential</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-lg p-4 sm:p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="hidden sm:block">
                <div className="flex items-center justify-between mb-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors", currentStep === step ? "bg-primary text-primary-foreground" : currentStep > step ? "bg-primary/80 text-primary-foreground" : "bg-muted text-muted-foreground")}>
                        {currentStep > step ? <Check className="w-5 h-5" /> : step}
                      </div>
                      <div className={cn("flex-1 h-1 mx-2 transition-colors", currentStep > step ? "bg-primary" : "bg-muted")} />
                    </div>
                  ))}
                  <div className="flex items-center">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors text-xs", currentStep === 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                      <Check className={cn("w-5 h-5", currentStep < 3 && "opacity-40")} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={cn(currentStep === 1 && "font-semibold text-foreground", "text-muted-foreground")}>Personal Info</span>
                  <span className={cn(currentStep === 2 && "font-semibold text-foreground", "text-muted-foreground")}>Incident Details</span>
                  <span className={cn(currentStep === 3 && "font-semibold text-foreground", "text-muted-foreground")}>Additional Details</span>
                  <span className={cn(currentStep === 3 && "font-semibold text-foreground", "text-muted-foreground")}>Submit</span>
                </div>
              </div>
              <div className="sm:hidden flex justify-between text-xs">
                <span className={cn("flex-1 text-center", currentStep === 1 ? "font-semibold text-foreground" : "text-muted-foreground")}>Personal Info</span>
                <span className={cn("flex-1 text-center", currentStep === 2 ? "font-semibold text-foreground" : "text-muted-foreground")}>Incident Details</span>
                <span className={cn("flex-1 text-center", currentStep === 3 ? "font-semibold text-foreground" : "text-muted-foreground")}>Additional Details</span>
                <span className={cn("flex-1 text-center", currentStep === 3 ? "font-semibold text-foreground" : "text-muted-foreground")}>Submit</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Step 1 */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="John Doe" className="h-10" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" placeholder="john@example.com" className="h-10" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Residence *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="bg-background h-10"><SelectValue placeholder="Select your country" /></SelectTrigger></FormControl>
                          <SelectContent className="bg-background z-50 max-h-[300px]">{countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 items-end">
                      <FormField control={form.control} name="countryCode" render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Code</FormLabel>
                          <Popover open={countryCodeOpen} onOpenChange={setCountryCodeOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" role="combobox" className={cn("w-full h-10 justify-between bg-background", !field.value && "text-muted-foreground")}>
                                  {field.value || "+1"}
                                  <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50 rotate-90" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                              <Command>
                                <CommandInput placeholder="Search country..." />
                                <CommandList>
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    {countryCodes.map((c, i) => (
                                      <CommandItem key={`${c.code}-${i}`} value={`${c.code} ${c.country}`} onSelect={() => { field.onChange(c.code); setCountryCodeOpen(false); }}>
                                        <Check className={cn("mr-2 h-4 w-4", c.code === field.value ? "opacity-100" : "opacity-0")} />
                                        {c.code} {c.country}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormDescription className="text-xs">Optional: Only used if clarification is required for your case.</FormDescription>
                          <FormControl><Input type="tel" placeholder="234 567 8900" className="h-10" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-xl font-semibold mb-4">Incident Details</h3>
                    <FormField control={form.control} name="scamType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Scam (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="bg-background"><SelectValue placeholder="Select scam type" /></SelectTrigger></FormControl>
                          <SelectContent className="bg-background z-50">{scamTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="incidentDate" render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>When did it happen? *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" className={cn("w-full pl-3 text-left font-normal bg-background", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus className="pointer-events-auto" />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="amountLostUsd" render={({ field }) => (
                        <FormItem><FormLabel>Estimated Amount Lost (USD) *</FormLabel><FormControl><Input type="number" step="0.01" placeholder="10000.00" {...field} /></FormControl><p className="text-sm text-muted-foreground mt-1">Given the costs involved in recovering funds, we advise investigations only for matters involving $10,000 or more.</p><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="transactionId" render={({ field }) => (
                        <FormItem><FormLabel>Wallet Address or Transaction Hash Involved *</FormLabel><FormControl><Input placeholder="0x..." {...field} /></FormControl><FormDescription>Paste the wallet address or transaction ID connected to the scam.</FormDescription><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="walletType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Wallet (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="bg-background"><SelectValue placeholder="Select wallet type" /></SelectTrigger></FormControl>
                          <SelectContent className="bg-background z-50">{walletTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="hasWalletAccess" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I still have access to the wallet</FormLabel>
                          <FormDescription>This helps determine tracing options.</FormDescription>
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem><FormLabel>Company Name (Optional)</FormLabel><FormControl><Input placeholder="If a company was involved" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
                    <FormField control={form.control} name="incidentDetails" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe What Happened *</FormLabel>
                        <FormControl><Textarea placeholder={"Include things like:\n• How you were approached\n• What platform was used\n• Any companies involved\n• Any communication channels"} className="min-h-[200px] resize-y" {...field} /></FormControl>
                        <FormDescription>The more detail you provide, the more precise your analysis will be.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Promo Code */}
                    <div className="border-t pt-6">
                      {!appliedPromo ? (
                        <div className="space-y-4">
                          {!showPromoInput ? (
                            <button type="button" onClick={() => setShowPromoInput(true)} className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <Tag className="w-4 h-4" /> Have a promo code?
                            </button>
                          ) : (
                            <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                              <label className="text-sm font-medium flex items-center gap-2"><Tag className="w-4 h-4" /> Promo Code</label>
                              <div className="flex gap-2">
                                <Input type="text" placeholder="Enter code" value={promoCode} onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(null); }} className="flex-1" disabled={isValidatingPromo} />
                                <Button type="button" onClick={validatePromoCode} disabled={isValidatingPromo || !promoCode.trim()} variant="secondary">
                                  {isValidatingPromo ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Validating...</> : "Apply"}
                                </Button>
                              </div>
                              {promoError && <p className="text-sm text-destructive">{promoError}</p>}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                              <div>
                                <p className="font-medium text-green-900 dark:text-green-100">Promo code "{appliedPromo.code}" applied!</p>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                  {appliedPromo.discountType === "percentage" ? `${appliedPromo.discountValue}% discount` : `$${appliedPromo.discountValue.toFixed(2)} off`}
                                </p>
                              </div>
                            </div>
                            <button type="button" onClick={removePromoCode} className="text-sm text-green-700 dark:text-green-300 hover:underline">Remove</button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Recap & Price Summary */}
                    <div className="border-t pt-6">
                      <p className="font-semibold mb-3">You're purchasing:</p>
                      <p className="text-foreground font-medium mb-3">Professional Crypto Investigation Report</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground mb-6">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Wallet tracing analysis</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Fund flow diagram</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Exchange identification</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Feasibility assessment</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Written next steps</li>
                      </ul>

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Original Price:</span>
                          <span className="line-through text-muted-foreground">${ORIGINAL_PRICE.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Discounted Price:</span>
                          <span className={appliedPromo ? "line-through text-muted-foreground" : "font-semibold text-foreground"}>${BASE_PRICE.toFixed(2)}</span>
                        </div>
                        {appliedPromo && (
                          <>
                            <div className="flex justify-between text-sm text-green-600 dark:text-green-400"><span>Promo Discount:</span><span>-${discountAmount.toFixed(2)}</span></div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total:</span><span>${finalPrice.toFixed(2)}</span></div>
                          </>
                        )}
                        {!appliedPromo && (
                          <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total:</span><span>${BASE_PRICE.toFixed(2)}</span></div>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground mb-6 bg-muted/50 p-4 rounded-md">
                        <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>Your information is kept strictly confidential and processed under GDPR/data protection standards.</p>
                      </div>
                      <div className="flex justify-center mb-6">
                        <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={(v) => setRecaptchaValue(v)} onExpired={() => setRecaptchaValue(null)} />
                      </div>
                      <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting || !recaptchaValue}>
                        {isSubmitting ? "Processing..." : `Submit & Go to Payment ($${finalPrice.toFixed(2)})`}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Nav Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1} className="min-w-[120px]">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  {currentStep < totalSteps && (
                    <Button type="button" onClick={nextStep} className="min-w-[120px]">
                      Next <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investigations;
