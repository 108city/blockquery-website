import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const requestTypeOptions = [
  { value: "myself", label: "Myself" },
  { value: "business", label: "A business / law firm" },
];

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phoneNumber: z.string().trim().min(7, "Phone number must be at least 7 digits").max(20, "Phone number is too long"),
  requestType: z.string().min(1, "Please select who this request is for"),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactForm>({
    fullName: "",
    email: "",
    phoneNumber: "",
    requestType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleChange = (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      contactSchema.parse(formData);
      setIsSubmitting(true);


      const { data, error: functionError } = await supabase.functions.invoke('submit-contact', {
        body: {
          fullName: formData.fullName,
          organization: formData.requestType === "business" ? "Business / Law Firm" : "Individual",
          email: formData.email,
          country: "Not specified",
          areaOfExpertise: formData.requestType,
          message: formData.message + (formData.phoneNumber ? `\n\nPhone: ${formData.phoneNumber}` : ""),
          
        },
      });

      if (functionError) {
        console.error('Submission error:', functionError);
        toast.error("There was an error submitting your form. Please try again.");
        return;
      }

      if (data?.error) {
        if (data.error.includes('Too many submissions')) {
          toast.error("Too many submissions. Please wait a moment before trying again.");
        } else {
          toast.error(data.error);
        }
        return;
      }

      navigate("/contact-thank-you");
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactForm] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the errors in the form");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              How can we help?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're reaching out about a personal crypto loss or on behalf of a company or client, share a few details below and our team will review your case and respond within 24 hours.
            </p>
          </div>

          <div className="border-t border-border mb-12" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-base mb-2 block">
                  First and last name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={handleChange("fullName")}
                  className={`h-14 text-base ${errors.fullName ? "border-destructive" : ""}`}
                />
                {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-base mb-2 block">
                  Email <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="test@gmail.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className={`h-14 text-base ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Row 2: Phone + Request type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phoneNumber" className="text-base mb-2 block">
                  Phone number <span className="text-primary">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="06123456789"
                  value={formData.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  className="h-14 text-base"
                />
              </div>
              <div>
                <Label htmlFor="requestType" className="text-base mb-2 block">
                  This request is for: <span className="text-primary">*</span>
                </Label>
                <Select
                  value={formData.requestType}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, requestType: value }));
                    if (errors.requestType) {
                      setErrors((prev) => ({ ...prev, requestType: undefined }));
                    }
                  }}
                >
                  <SelectTrigger className={`h-14 ${errors.requestType ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {requestTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.requestType && <p className="text-destructive text-sm mt-1">{errors.requestType}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-base mb-2 block">
                Tell us what happened <span className="text-primary">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange("message")}
                rows={8}
                className={`text-base resize-none ${errors.message ? "border-destructive" : ""}`}
              />
              {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
            </div>


            <Button type="submit" size="lg" className="font-semibold text-base px-10" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
